import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 30.08459, // Default latitude (Kimihurura)
  lng: -1.950177, // Default longitude
};

const GoogleMapView = ({ latitude, longitude, blinking }) => {
  console.log("GoogleMapView received latitude:", latitude);
  console.log("GoogleMapView received longitude:", longitude);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [markerVisible, setMarkerVisible] = useState(true);

  useEffect(() => {
    if (blinking) {
      const interval = setInterval(() => {
        setMarkerVisible((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [blinking]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  const center = {
    lat: latitude || defaultCenter.lat,
    lng: longitude || defaultCenter.lng,
  };

  console.log("GoogleMapView center set to:", center);

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={14} center={center}>
      {markerVisible && latitude && longitude && (
        <Marker position={{ lat: latitude, lng: longitude }} />
      )}
    </GoogleMap>
  );
};

export default GoogleMapView;
