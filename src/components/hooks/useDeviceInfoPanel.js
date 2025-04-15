import { useState, useEffect } from "react";
import axios from "axios";
import { isValidIMEI, isValidMSISDN } from "../../utils/Validators"; // Ensure you have these validators

const useDeviceInfo = (identifier) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!identifier) {
      console.log("No identifier provided, skipping API call.");
      return;
    }

    // Determine the correct query parameter (imei or msisdn)
    const paramType = isValidIMEI(identifier)
      ? "imei"
      : isValidMSISDN(identifier)
      ? "msisdn"
      : null;
    if (!paramType) {
      console.log("Invalid identifier format:", identifier);
      return;
    }

    console.log(`Fetching device info with ${paramType}:`, identifier);

    const fetchDeviceInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://livetracking-system.onrender.com/api/locations/getLiveLocation`,
          {
            params: { [paramType]: identifier }, // Correctly pass imei/msisdn
          }
        );

        console.log("API Response:", response.data);
        setDeviceInfo(response.data);
      } catch (err) {
        console.error(
          "Error fetching device info:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || "Failed to fetch device info");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceInfo();
  }, [identifier]);

  return { deviceInfo, loading, error };
};

export default useDeviceInfo;
