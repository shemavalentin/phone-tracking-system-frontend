import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import DeviceInfoPanel from "../tracking/DeviceInfoPanel";
import {
  LayoutContainer,
  MainContent,
  ContentWrapper,
  ScrollableContent,
} from "../../styles/LayoutStyles";

const Layout = ({ children, deviceData, isCollapsed, toggleSidebar }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  return (
    <LayoutContainer>
      <Navbar handleSidebarToggle={handleSidebarToggle} />
      <MainContent>
        <Sidebar
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          isMobileOpen={isMobileSidebarOpen}
        />

        <ContentWrapper isCollapsed={isCollapsed}>
          {deviceData && <DeviceInfoPanel deviceData={deviceData} />}

          <ScrollableContent>{children}</ScrollableContent>

          {/* Footer is now inside ContentWrapper, ensuring it stays at the bottom */}
          <Footer />
        </ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
