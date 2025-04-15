import React, { useState, useEffect } from "react";
import {
  PanelContainer,
  PanelHeader,
  PanelContent,
  Section,
  ExpandableSection,
  ExpandableButton,
  BusinessList,
  BusinessItem,
  ViewMapButton,
} from "../../styles/DeviceInfoPanel.styles";

import MapModal from "../tracking/MapModal";

const DeviceInfoPanel = ({ trackedDeviceId, deviceDetails }) => {
  const [showMap, setShowMap] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    handover: false,
    locationDetails: false,
    businesses: false,
    computedDistances: false,
  });

  useEffect(() => {
    console.log("DeviceInfoPanel - trackedDeviceId:", trackedDeviceId);
    console.log("DeviceInfoPanel - deviceDetails:", deviceDetails);

    if (deviceDetails && deviceDetails.deviceId !== trackedDeviceId) {
      console.warn(
        `⚠️ DeviceInfoPanel: Mismatched data (Expected: ${trackedDeviceId}, Got: ${deviceDetails.deviceId})`
      );
    }
  }, [trackedDeviceId, deviceDetails]);

  // Ensure deviceDetails is for the correct device
  if (!deviceDetails || deviceDetails.deviceId !== trackedDeviceId) {
    return (
      <PanelContainer>
        No location data available for this device.
      </PanelContainer>
    );
  }

  const { latestLocation } = deviceDetails;

  if (!latestLocation) {
    return <PanelContainer>Waiting for location updates...</PanelContainer>;
  }

  // Extract movementSimulation details
  const movement = latestLocation.movementSimulation?.[0] || {};
  const {
    handoverData = null,
    readableLocation = {},
    computedDistances = [],
  } = movement;
  const localBusinesses = latestLocation.localBusinesses || [];

  // Toggle expandable sections
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <PanelContainer>
        <PanelHeader>DEVICE LOCATION DETAILS</PanelHeader>
        <PanelContent>
          <Section>
            <strong>Device ID:</strong> {trackedDeviceId || "N/A"}
          </Section>
          <Section>
            <strong>Timestamp:</strong> {latestLocation.timestamp || "N/A"}
          </Section>
          <Section>
            <strong>Status:</strong>{" "}
            {latestLocation.movementStatusMessage || "N/A"}
          </Section>
          <Section>
            <strong>Coordinates:</strong> {latestLocation.latitude || "N/A"},{" "}
            {latestLocation.longitude || "N/A"}
          </Section>
          <Section>
            <strong>Connected Anchor:</strong>{" "}
            {latestLocation.connectedAnchor || "N/A"}
          </Section>

          {/* Handover Data */}
          {handoverData && (
            <ExpandableSection>
              <ExpandableButton onClick={() => toggleSection("handover")}>
                Handover Data {expandedSections.handover ? "▲" : "▼"}
              </ExpandableButton>
              {expandedSections.handover && (
                <div>
                  <Section>
                    <strong>Source Anchor:</strong>{" "}
                    {handoverData.sourceAnchor?.id || "N/A"}
                  </Section>
                  <Section>
                    <strong>Target Anchor:</strong>{" "}
                    {handoverData.targetAnchor?.id || "N/A"}
                  </Section>
                  <Section>
                    <strong>Handover Time:</strong>{" "}
                    {handoverData.handoverTime || "N/A"}
                  </Section>
                </div>
              )}
            </ExpandableSection>
          )}

          {/* Readable Location */}
          {readableLocation && Object.keys(readableLocation).length > 0 && (
            <ExpandableSection>
              <ExpandableButton
                onClick={() => toggleSection("locationDetails")}
              >
                Readable Location {expandedSections.locationDetails ? "▲" : "▼"}
              </ExpandableButton>
              {expandedSections.locationDetails && (
                <div>
                  <Section>
                    <strong>Address:</strong>{" "}
                    {readableLocation.formattedAddress || "N/A"}
                  </Section>
                  <Section>
                    <strong>City:</strong> {readableLocation.city || "N/A"}
                  </Section>
                  <Section>
                    <strong>State:</strong> {readableLocation.state || "N/A"}
                  </Section>
                  <Section>
                    <strong>Country:</strong>{" "}
                    {readableLocation.country || "N/A"}
                  </Section>
                </div>
              )}
            </ExpandableSection>
          )}

          {/* Nearby Businesses */}
          {localBusinesses.length > 0 && (
            <ExpandableSection>
              <ExpandableButton onClick={() => toggleSection("businesses")}>
                Nearby Businesses {expandedSections.businesses ? "▲" : "▼"}
              </ExpandableButton>
              {expandedSections.businesses && (
                <BusinessList>
                  {localBusinesses.map((business, index) => (
                    <BusinessItem key={index}>
                      <strong>{business.name}</strong>
                      <p>{business.address}</p>
                      <p>Type: {business.types?.join(", ") || "N/A"}</p>
                    </BusinessItem>
                  ))}
                </BusinessList>
              )}
            </ExpandableSection>
          )}

          {/* Computed Distances */}
          {computedDistances.length > 0 && (
            <ExpandableSection>
              <ExpandableButton
                onClick={() => toggleSection("computedDistances")}
              >
                Computed Distances{" "}
                {expandedSections.computedDistances ? "▲" : "▼"}
              </ExpandableButton>
              {expandedSections.computedDistances && (
                <div>
                  {computedDistances.map((distance, index) => (
                    <Section key={index}>
                      <strong>Anchor:</strong> {distance.anchor || "N/A"}
                      <br />
                      <strong>Distance:</strong>{" "}
                      {distance.distance?.toFixed(2) || "N/A"} meters
                    </Section>
                  ))}
                </div>
              )}
            </ExpandableSection>
          )}

          {/* View on Map Button */}
          <ViewMapButton onClick={() => setShowMap(true)}>
            View on Map
          </ViewMapButton>
        </PanelContent>
      </PanelContainer>

      {/* Map Modal */}
      {showMap && (
        <MapModal
          latitude={latestLocation.latitude}
          longitude={latestLocation.longitude}
          onClose={() => setShowMap(false)}
        />
      )}
    </>
  );
};

export default DeviceInfoPanel;
