import React, { useEffect, useState } from "react";
import GoogleMapView from "../components/tracking/GoogleMapView";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Notification from "../components/common/Notification";
import DeviceInfoPanel from "../components/tracking/DeviceInfoPanel";
import { isValidIMEI, isValidMSISDN } from "../utils/Validators";
import {
  StyledContainer,
  FormWrapper,
  StyledTextField,
  StyledButton,
  MapContainer,
} from "../styles/LiveTracking.styles";
import {
  subscribeToDevice,
  unsubscribeFromDevice,
} from "../services/socketService";

const LiveTracking = ({ isCollapsed }) => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [trackedDeviceId, setTrackedDeviceId] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // ✅ Notification queue
  const [notificationQueue, setNotificationQueue] = useState([]);

  // Validate IMEI/MSISDN
  useEffect(() => {
    setIsValid(isValidIMEI(identifier) || isValidMSISDN(identifier));
  }, [identifier]);

  // Track WebSocket Subscriptions
  useEffect(() => {
    if (!trackedDeviceId) return;

    subscribeToDevice(trackedDeviceId, (newData) => {
      setDeviceDetails((prevDetails) => ({
        ...prevDetails,
        latestLocation: {
          ...prevDetails?.latestLocation,
          ...newData?.latestLocation,
        },
        movementSimulation:
          newData?.movementSimulation || prevDetails?.movementSimulation || [],
        movementStatusMessage:
          newData?.movementStatusMessage || prevDetails?.movementStatusMessage,
      }));

      setShowMap(true);
    });

    return () => {
      unsubscribeFromDevice(trackedDeviceId);
    };
  }, [trackedDeviceId]);

  const fetchLiveLocation = async () => {
    if (!isValid) return;

    setError("");
    setLoading(true);
    setProgress(0);
    setShowMap(false);

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 20));
    }, 500);

    try {
      const paramType = isValidIMEI(identifier) ? "imei" : "msisdn";
      const response = await fetch(
        `https://livetracking-system.onrender.com/api/locations/getLiveLocation?${paramType}=${identifier}`
      );
      const data = await response.json();

      if (data.success && data.latestLocation) {
        setTrackedDeviceId(data.deviceId);
        setDeviceDetails(data);

        // ✅ Add success notification to queue
        setNotificationQueue((prev) => [
          ...prev,
          {
            message: "✅ The device has been successfully traced.",
            severity: "success",
          },
        ]);
      } else {
        setTrackedDeviceId(null);
        setDeviceDetails(null);

        // ❌ Add warning notification to queue
        setNotificationQueue((prev) => [
          ...prev,
          {
            message:
              data.message ||
              "⚠️ No recent location data found for the device.",
            severity: "warning",
          },
        ]);
      }
    } catch (err) {
      setError(err.message);
      setTrackedDeviceId(null);
      setDeviceDetails(null);

      // ❌ Add error notification to queue
      setNotificationQueue((prev) => [
        ...prev,
        {
          message: err.message || "❌ Failed to fetch location.",
          severity: "error",
        },
      ]);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <StyledContainer isCollapsed={isCollapsed}>
      <FormWrapper isCollapsed={isCollapsed}>
        <Typography variant="h5" gutterBottom>
          Device Tracking Portal
        </Typography>

        <StyledTextField
          label="Enter IMEI or MSISDN"
          variant="outlined"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isValid && !loading) {
              fetchLiveLocation();
            }
          }}
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

        {!isValid && identifier.length > 0 && (
          <Typography variant="body2" color="error">
            Please enter a valid IMEI or MSISDN
          </Typography>
        )}
      </FormWrapper>

      {deviceDetails && (trackedDeviceId || identifier) ? (
        <DeviceInfoPanel
          trackedDeviceId={trackedDeviceId || identifier}
          deviceData={deviceDetails}
        />
      ) : (
        <Typography variant="body2" color="textSecondary">
          No device details available.
        </Typography>
      )}

      {showMap && deviceDetails?.latestLocation && (
        <MapContainer>
          <GoogleMapView
            latitude={deviceDetails.latestLocation.latitude}
            longitude={deviceDetails.latestLocation.longitude}
          />
        </MapContainer>
      )}

      {/* ✅ Notification queue component */}
      <Notification queue={notificationQueue} />
    </StyledContainer>
  );
};

export default LiveTracking;
