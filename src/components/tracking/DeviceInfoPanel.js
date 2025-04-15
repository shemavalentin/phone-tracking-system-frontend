import React, { useState } from "react";
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
import { FaChevronDown } from "react-icons/fa";
import MapModal from "../tracking/MapModal";

const ExpandableContent = ({ title, isExpanded, toggleExpand, children }) => (
  <ExpandableSection>
    <ExpandableButton
      onClick={toggleExpand}
      className={isExpanded ? "expanded" : ""}
    >
      {title}
      <FaChevronDown className={`icon ${isExpanded ? "rotated" : ""}`} />
    </ExpandableButton>
    {isExpanded && <div>{children}</div>}
  </ExpandableSection>
);

const DeviceInfoPanel = ({ deviceData }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [showMap, setShowMap] = useState(false);

  if (!deviceData?.latestLocation) {
    console.warn(
      "DeviceInfoPanel received invalid or empty deviceData:",
      deviceData
    );
    return null;
  }

  const { latestLocation } = deviceData;
  const movement = latestLocation.movementSimulation?.[0] || {};
  const {
    handoverData = {},
    readableLocation = {},
    computedDistances = [],
    connectedAnchor,
  } = movement;

  const toggleExpand = (section) => {
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
            <strong>Status:</strong>{" "}
            {latestLocation.movementStatusMessage || "N/A"}
          </Section>

          <Section>
            <strong>Computed Device Coordinates:</strong>
            <br />
            <br />* Latitude: {latestLocation.latitude ?? "N/A"}
            <br />* Longitude: {latestLocation.longitude ?? "N/A"}
          </Section>

          <Section>
            <strong>Connected Anchor:</strong> {connectedAnchor || "N/A"}
          </Section>

          {handoverData?.handoverTime && (
            <ExpandableContent
              title="Handover Data"
              isExpanded={expandedSections.handover}
              toggleExpand={() => toggleExpand("handover")}
            >
              <Section>
                <strong>Source Anchor:</strong>
                <br />* Tower ID: {handoverData.sourceAnchor?.id ?? "N/A"}
                <br />* Latitude: {handoverData.sourceAnchor?.latitude ?? "N/A"}
                <br />* Longitude:{" "}
                {handoverData.sourceAnchor?.longitude ?? "N/A"}
                <br />* RSSI: {handoverData.sourceAnchor?.rssi ?? "N/A"}
              </Section>
              <Section>
                <strong>Target Anchor:</strong>
                <br />* Tower ID: {handoverData.targetAnchor?.id ?? "N/A"}
                <br />* Latitude: {handoverData.targetAnchor?.latitude ?? "N/A"}
                <br />* Longitude:{" "}
                {handoverData.targetAnchor?.longitude ?? "N/A"}
                <br />* RSSI: {handoverData.targetAnchor?.rssi ?? "N/A"}
              </Section>
              <Section>
                <strong>Handover Time:</strong>{" "}
                {new Date(handoverData.handoverTime).toLocaleString()}
              </Section>
            </ExpandableContent>
          )}

          {readableLocation?.formattedAddress && (
            <ExpandableContent
              title="Location Details"
              isExpanded={expandedSections.location}
              toggleExpand={() => toggleExpand("location")}
            >
              <Section>
                <strong>Formatted Address:</strong>{" "}
                {readableLocation.formattedAddress}
              </Section>
              <Section>
                <strong>Country:</strong> {readableLocation.country ?? "N/A"}
              </Section>
              <Section>
                <strong>State:</strong> {readableLocation.state ?? "N/A"}
              </Section>
              <Section>
                <strong>District:</strong> {readableLocation.district ?? "N/A"}
              </Section>
              <Section>
                <strong>Sector:</strong> {readableLocation.sector ?? "N/A"}
              </Section>
              <Section>
                <strong>Cell:</strong> {readableLocation.cell ?? "N/A"}
              </Section>
              <Section>
                <strong>Village:</strong> {readableLocation.village ?? "N/A"}
              </Section>
              <Section>
                <strong>Timezone:</strong> {readableLocation.timezone ?? "N/A"}
              </Section>
            </ExpandableContent>
          )}

          {readableLocation?.localBusinesses?.length > 0 && (
            <ExpandableContent
              title="Nearby Businesses"
              isExpanded={expandedSections.businesses}
              toggleExpand={() => toggleExpand("businesses")}
            >
              <BusinessList>
                {readableLocation.localBusinesses.map((business, index) => (
                  <BusinessItem key={business._id || index}>
                    <strong>{business.name}</strong> - {business.address} (
                    {business.types})
                  </BusinessItem>
                ))}
              </BusinessList>
            </ExpandableContent>
          )}

          {computedDistances.length > 0 && (
            <ExpandableContent
              title="Computed Distances"
              isExpanded={expandedSections.distances}
              toggleExpand={() => toggleExpand("distances")}
            >
              {computedDistances.map((dist, index) => (
                <Section key={index}>
                  * Latitude: {dist.latitude ?? "N/A"}
                  <br />* Longitude: {dist.longitude ?? "N/A"}
                  <br />* Distance: {dist.distance ?? "N/A"} Meters
                </Section>
              ))}
            </ExpandableContent>
          )}

          <ViewMapButton onClick={() => setShowMap(true)}>
            View on Map
          </ViewMapButton>
        </PanelContent>
      </PanelContainer>

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
