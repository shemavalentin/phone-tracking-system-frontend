// MapModal.js
<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 7da024d (Change API url from local host to production)
import GoogleMapView from "./GoogleMapView"; // Ensure correct path
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  MinimizeButton,
} from "../../styles/MapModal.styles";

const MapModal = ({ latitude, longitude, onClose }) => {
  const [isMaximized, setIsMaximized] = useState(false);
<<<<<<< HEAD
=======
  const [coords, setCoords] = useState({ latitude, longitude });

  useEffect(() => {
    setCoords({ latitude, longitude });
  }, [latitude, longitude]);
>>>>>>> 7da024d (Change API url from local host to production)

  return (
    <ModalOverlay>
      <ModalContainer isMaximized={isMaximized}>
        <ModalHeader>
          <span>Live Device Location</span>
          <div>
            <MinimizeButton onClick={() => setIsMaximized(!isMaximized)}>
              {isMaximized ? "Minimize" : "Maximize"}
            </MinimizeButton>
            <CloseButton onClick={onClose}>X</CloseButton>
          </div>
        </ModalHeader>
        <GoogleMapView
          latitude={latitude}
          longitude={longitude}
          blinking={true}
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MapModal;
