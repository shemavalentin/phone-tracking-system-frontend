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

  if (!deviceData || !deviceData.latestLocation) {
    console.log("DeviceInfoPanel received invalid data:", deviceData);
    return null;
  }

  const { latestLocation } = deviceData;
  const movement = latestLocation.movementSimulation?.[0] || {};
  const { handoverData, readableLocation, computedDistances } = movement;

  const toggleExpand = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
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
            <strong>Computed Device Coordinates:</strong> <br />
            <br />* Latitude: {latestLocation.latitude || "N/A"}, <br />
            <br />* Longitude: {latestLocation.longitude || "N/A"}
          </Section>
          <Section>
            <strong>Connected Anchor:</strong>{" "}
            {movement.connectedAnchor || "N/A"}
          </Section>

          {/* Handover Data */}
          {handoverData && (
            <ExpandableContent
              title="Handover Data"
              isExpanded={expandedSections.handover}
              toggleExpand={() => toggleExpand("handover")}
            >
              <Section>
                <strong>Source Anchor:</strong> <br />
                <br />* Tower ID:
                {handoverData.sourceAnchor?.id || "N/A"}, <br />* Latitude:
                {handoverData.sourceAnchor?.latitude || "N/A"}, <br />*
                Longitude: {handoverData.sourceAnchor?.longitude || "N/A"},{" "}
                <br />* RSSI:
                {handoverData.sourceAnchor?.rssi || "N/A"}
              </Section>
              <Section>
                <strong>Target Anchor:</strong> <br /> <br />* Tower ID:
                {handoverData.targetAnchor?.id || "N/A"}, <br />* Latitude:{" "}
                {handoverData.targetAnchor?.latitude || "N/A"}, <br />*
                Longitude: {handoverData.targetAnchor?.longitude || "N/A"},{" "}
                <br />* RSSI: {handoverData.targetAnchor?.rssi || "N/A"}
              </Section>
              <Section>
                <strong>Handover Time:</strong>{" "}
                {handoverData.handoverTime
                  ? new Date(handoverData.handoverTime).toLocaleString()
                  : "N/A"}
              </Section>
            </ExpandableContent>
          )}

          {/* Readable Location */}
          {readableLocation && (
            <ExpandableContent
              title="Location Details"
              isExpanded={expandedSections.location}
              toggleExpand={() => toggleExpand("location")}
            >
              <Section>
                <strong>Formatted Address:</strong>{" "}
                {readableLocation.formattedAddress || "N/A"}
              </Section>
              <Section>
                <strong>Country:</strong> {readableLocation.country || "N/A"}
              </Section>
              <Section>
                <strong>State:</strong> {readableLocation.state || "N/A"}
              </Section>
              <Section>
                <strong>District:</strong> {readableLocation.district || "N/A"}
              </Section>
              <Section>
                <strong>Sector:</strong> {readableLocation.sector || "N/A"}
              </Section>
              <Section>
                <strong>Cell:</strong> {readableLocation.cell || "N/A"}
              </Section>
              <Section>
                <strong>Village:</strong> {readableLocation.village || "N/A"}
              </Section>
              <Section>
                <strong>Timezone:</strong> {readableLocation.timezone || "N/A"}
              </Section>
            </ExpandableContent>
          )}

          {/* Nearby Businesses */}
          {readableLocation?.localBusinesses?.length > 0 && (
            <ExpandableContent
              title="Nearby Businesses"
              isExpanded={expandedSections.businesses}
              toggleExpand={() => toggleExpand("businesses")}
            >
              <Section>
                <BusinessList>
                  {readableLocation.localBusinesses.map((business) => (
                    <BusinessItem key={business._id}>
                      <strong>{business.name}</strong> - {business.address} (
                      {business.types})
                    </BusinessItem>
                  ))}
                </BusinessList>
              </Section>
            </ExpandableContent>
          )}

          {/* Computed Distances */}
          {computedDistances?.length > 0 && (
            <ExpandableContent
              title="Computed Distances"
              isExpanded={expandedSections.distances}
              toggleExpand={() => toggleExpand("distances")}
            >
              {computedDistances.map((dist, index) => (
                <Section key={index}>
                  * Latitude: {dist.latitude || "N/A"},
                  <br />* Longitude: {dist.longitude || "N/A"} <br />* Distance
                  from tower to Device: {dist.distance || "N/A"} Meters
                </Section>
              ))}
            </ExpandableContent>
          )}

          {/* View on Map Button */}
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
