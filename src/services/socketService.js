import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  "http://https://livetracking-system.onrender.com";
let socket = null;
let currentSubscription = null; // ✅ Track the current subscription

/**
 * Establishes a WebSocket connection.
 * @param {string} token - Authentication token.
 */
export const connectSocket = (token) => {
  if (socket) {
    console.log("[WebSocket] Already connected.");
    return;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
  });

  socket.on("connect", () => {
    console.log("[WebSocket] Connected:", socket.id);

    // ✅ If we were tracking a device, re-subscribe on reconnect
    if (currentSubscription) {
      console.log(
        `[WebSocket] Re-subscribing to ${currentSubscription} after reconnect`
      );
      subscribeToDevice(currentSubscription, (data) => {
        console.log(
          "[WebSocket] Location Update received after reconnect:",
          data
        );
      });
    }
  });

  socket.on("disconnect", () => console.log("[WebSocket] Disconnected"));

  socket.on("connect_error", (error) => {
    console.error("[WebSocket] Connection Error:", error.message);
  });
};

/**
 * Subscribes to real-time location updates for a device.
 * Ensures only one active subscription per device.
 * @param {string} deviceIdentifier - IMEI or MSISDN.
 * @param {function} callback - Function to handle location updates.
 */
export const subscribeToDevice = (deviceIdentifier, callback) => {
  if (!socket) {
    console.warn("[WebSocket] No active socket connection.");
    return;
  }

  // Prevent redundant subscriptions
  if (currentSubscription === deviceIdentifier) {
    console.log(`[WebSocket] Already subscribed to ${deviceIdentifier}.`);
    return;
  }

  // Unsubscribe from previous subscription if it exists
  if (currentSubscription) {
    unsubscribeFromDevice(currentSubscription);
  }

  console.log(`[WebSocket] Subscribing to device: ${deviceIdentifier}`);
  currentSubscription = deviceIdentifier;

  const paramType = deviceIdentifier.length === 15 ? "imei" : "msisdn";
  socket.emit("subscribeToDevice", { [paramType]: deviceIdentifier });

  // Remove any previous listener to prevent duplicates
  socket.off("deviceLocationUpdate");
  socket.on("deviceLocationUpdate", (data) => {
    if (data.deviceId === deviceIdentifier) {
      console.log("[WebSocket] Location Update received:", data);
      callback(data);
    }
  });
};

/**
 * Unsubscribes from a device to stop receiving updates.
 * @param {string} deviceIdentifier - IMEI or MSISDN.
 */
export const unsubscribeFromDevice = (deviceIdentifier) => {
  if (!socket || !currentSubscription) return;

  console.log(`[WebSocket] Unsubscribing from: ${deviceIdentifier}`);
  const paramType = deviceIdentifier.length === 15 ? "imei" : "msisdn";

  socket.emit("unsubscribeFromDevice", { [paramType]: deviceIdentifier });
  socket.off("deviceLocationUpdate"); // Remove listener
  currentSubscription = null; // ✅ Clear the tracked subscription
};

/**
 * Closes the WebSocket connection.
 */
export const closeWebSocket = () => {
  if (socket) {
    console.log("[WebSocket] Closing connection...");
    socket.disconnect();
    socket = null;
    currentSubscription = null;
  }
};
