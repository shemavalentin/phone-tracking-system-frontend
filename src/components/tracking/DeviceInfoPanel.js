import React, { useRef, useEffect, useState } from "react";

import {
  ResponsivePanelContainer,
  PanelHeader,
  PanelContent,
  Section,
  ExpandableSection,
  ExpandableButton,
  BusinessList,
  BusinessItem,
  ViewMapButton,
  ChevronIcon,
  AccordionWrapper,
  CloseButton,
} from "../../styles/DeviceInfoPanel.styles";
//import { FaChevronDown } from "react-icons/fa";
import MapModal from "../tracking/MapModal";

const ExpandableContent = ({
  title,
  sectionKey,
  activeSection,
  setActiveSection,
  children,
}) => {
  const contentRef = useRef(null);
  const isExpanded = activeSection === sectionKey;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  const toggle = () => {
    setActiveSection(isExpanded ? null : sectionKey);
  };

  return (
    <ExpandableSection>
      <ExpandableButton
        onClick={toggle}
        aria-expanded={isExpanded}
        aria-controls={`${sectionKey}-content`}
      >
        {title}

        <ChevronIcon className={isExpanded ? "rotated" : " "} />
      </ExpandableButton>

      <AccordionWrapper
        id={`${sectionKey}-content`}
        ref={contentRef}
        style={{ height: `${height}px` }}
      >
        <div>{children}</div>
      </AccordionWrapper>
    </ExpandableSection>
  );
};

const DeviceInfoPanel = ({ deviceData }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  const panelRef = useRef();

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEscKey = (event) => {
    if (event.key === "Escape") setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  if (!deviceData || !deviceData.latestLocation) return null;

  const { latestLocation } = deviceData;
  const movement = latestLocation.movementSimulation?.[0] || {};
  const { handoverData, readableLocation, computedDistances } = movement;

  return (
    <>
      <ResponsivePanelContainer
        ref={panelRef}
        isVisible={isVisible}
        role="dialog"
        aria-modal="true"
      >
        <CloseButton
          onClick={() => setIsVisible(false)}
          aria-label="Close Panel"
        >
          &items;
        </CloseButton>

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
              sectionKey="handover"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
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
              sectionKey="location"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
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
              sectionKey="business"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
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
              sectionKey="distance"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
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
      </ResponsivePanelContainer>

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
