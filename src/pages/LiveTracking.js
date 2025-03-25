import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import GoogleMapView from "../components/tracking/GoogleMapView";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Notification from "../components/common/Notification";
import DeviceInfoPanel from "../components/tracking/DeviceInfoPanel";
import { isValidIMEI, isValidMSISDN } from "../utils/Validators";
import {
  StyledContainer,
  FormWrapper,
  MapContainer,
  StyledTextField,
  StyledButton,
} from "../styles/LiveTracking.styles";

const LiveTracking = ({ isCollapsed }) => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // const navigate = useNavigate();

  useEffect(() => {
    setIsValid(isValidIMEI(identifier) || isValidMSISDN(identifier));
  }, [identifier]);

  const fetchLiveLocation = async () => {
    if (!isValid) return;
    setError("");
    setLoading(true);
    setProgress(0);

    // Ressetting map visibility on new search
    setShowMap(false);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 20;
      });
    }, 500);

    try {
      const paramType = isValidIMEI(identifier) ? "imei" : "msisdn";
      const response = await fetch(
        `http://localhost:5000/api/locations/getLiveLocation?${paramType}=${identifier}`
      );
      const data = await response.json();

      console.log("Getting Device location detailed data:", data);

      if (response.ok && data.success && data.latestLocation) {
        setLocation(data); // Store full API response

        setNotification({
          open: true,
          message: "Location successfully traced!",
          severity: "success",
        });
      } else {
        setError(data.message || "Device location not found.");
        setNotification({
          open: true,
          message: data.message || "Device location not found.",
          severity: "error",
        });
      }
    } catch (err) {
      setError("Failed to fetch location. Check API.");
      setNotification({
        open: true,
        message: "Failed to fetch location. Please check your API connection.",
        severity: "error",
      });
    } finally {
      clearInterval(interval);
      setLoading(false);
      setProgress(100);
    }
  };

  return (
    <StyledContainer isCollapsed={isCollapsed}>
      {/* Form dynamically adjusts with sidebar */}
      <FormWrapper isCollapsed={isCollapsed}>
        <Typography variant="h5" gutterBottom>
          Device Tracking Portal
        </Typography>

        <StyledTextField
          label="Enter IMEI or MSISDN"
          variant="outlined"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          margin="normal"
          error={!!error}
          helperText={error || ""}
        />

        <StyledButton
          variant="contained"
          color="primary"
          onClick={fetchLiveLocation}
          disabled={!isValid || loading}
        >
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CircularProgress
                size={24}
                variant="determinate"
                value={progress}
              />
              <Typography variant="body2">{progress}%</Typography>
            </div>
          ) : (
            "Track Device"
          )}
        </StyledButton>
      </FormWrapper>

      {/* Device Info Panel */}
      {location && (
        <DeviceInfoPanel deviceData={location} setShowMap={setShowMap} />
      )}

      {/* Map only appears when "View on Map" is clicked */}
      {showMap && location?.latestLocation && (
        <MapContainer isCollapsed={isCollapsed}>
          <GoogleMapView
            latitude={location.latestLocation.latitude}
            longitude={location.latestLocation.longitude}
            blinking={true}
          />
        </MapContainer>
      )}

      {/* Device Info Panel */}
      {location && <DeviceInfoPanel deviceData={location} />}

      {/* Notification */}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </StyledContainer>
  );
};

export default LiveTracking;
