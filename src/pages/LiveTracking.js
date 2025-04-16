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
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Validate IMEI/MSISDN
  useEffect(() => {
    setIsValid(isValidIMEI(identifier) || isValidMSISDN(identifier));
  }, [identifier]);

  // Track WebSocket Subscriptions
  useEffect(() => {
    console.log("LiveTracking.js - Tracked Device ID:", trackedDeviceId);
    if (!trackedDeviceId) return;

    console.log(`[WebSocket] Subscribing to ${trackedDeviceId}`);

    subscribeToDevice(trackedDeviceId, (newData) => {
      console.log("🔄 Real-time update received:", newData);

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
      console.log(`[WebSocket] Unsubscribing from ${trackedDeviceId}`);
      unsubscribeFromDevice(trackedDeviceId);
    };
  }, [trackedDeviceId]);

  // Debugging: Log state updates
  useEffect(() => {
    console.log("Device Details updated:", deviceDetails);
  }, [deviceDetails]);

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

      console.log("Fetched Device Data:", data);

      if (data.success && data.latestLocation) {
        console.log("🚀 Storing Device ID:", data.deviceId);
        setTrackedDeviceId(data.deviceId);

        console.log("💾 Storing Device Details:", data);
        setDeviceDetails(data);

        // ✅ Show success notification
        setNotification({
          open: true,
          message: "The device has been successfully traced.",
          severity: "success",
        });
      } else {
        console.error("❌ Invalid response format:", data);

        // ❌ Show failure notification
        setNotification({
          open: true,
          message:
            data.message || "No recent location data found for the device.",
          severity: "warning",
        });

        setTrackedDeviceId(null);
        setDeviceDetails(null);
      }
    } catch (err) {
      setError(err.message);
      setTrackedDeviceId(null);
      setDeviceDetails(null);

      // ❌ Show error notification
      setNotification({
        open: true,
        message: err.message || "Failed to fetch location.",
        severity: "error",
      });
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🟢 Updated trackedDeviceId:", trackedDeviceId);
  }, [trackedDeviceId]);

  useEffect(() => {
    console.log("🟢 Updated deviceDetails:", deviceDetails);
  }, [deviceDetails]);

  console.log(
    "Rendering DeviceInfoPanel with trackedDeviceId:",
    trackedDeviceId
  );
  console.log("📌 Passing to DeviceInfoPanel ->", {
    trackedDeviceId,
    deviceDetails,
  });

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

          {/* {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CircularProgress size={24} />

              <Typography variant="body2"> Loading ...</Typography>
            </div>
          ) : (
            "Track Device"
          )} */}
        </StyledButton>

        {/* Better feedback for Invalid Input */}

        {!isValid && identifier.length > 0 && (
          <Typography variant="body2" color="error">
            Please enter a valid IMEI or MSISDN
          </Typography>
        )}
      </FormWrapper>

      {/* ✅ Render only when valid data exists */}
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
