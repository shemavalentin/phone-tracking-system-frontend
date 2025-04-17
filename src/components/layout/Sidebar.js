import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import MapIcon from "@mui/icons-material/Map";
import ReportIcon from "@mui/icons-material/Assessment";
import AlertIcon from "@mui/icons-material/Notifications";
import SupportIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import {
  SidebarContainer,
  SidebarHeader,
  SidebarMenu,
  SidebarItem,
  SidebarIcon,
  ToggleButton,
  HeaderContent,
  ExpandableSection,
  ExpandableButton,
} from "../../styles/SidebarStyles";

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen }) => {
  const [isTrackingOpen, setIsTrackingOpen] = useState(true);

  return (
    <SidebarContainer isCollapsed={isCollapsed} isMobileOpen={isMobileOpen}>
      <SidebarHeader>
        <HeaderContent>
          <ToggleButton onClick={toggleSidebar}>
            <MenuIcon />
          </ToggleButton>
          {!isCollapsed && <span>Menu</span>}
        </HeaderContent>
      </SidebarHeader>

      <SidebarMenu>
        <SidebarItem to="/" activeClassName="active">
          <SidebarIcon>
            <HomeIcon />
          </SidebarIcon>
          {!isCollapsed && "Dashboard"}
        </SidebarItem>

        <SidebarItem to="/search" activeClassName="active">
          <SidebarIcon>
            <SearchIcon />
          </SidebarIcon>
          {!isCollapsed && "Search / Filter Devices"}
        </SidebarItem>

        <SidebarItem to="/trackeddeviceslist" activeClassName="active">
          <SidebarIcon>
            <ListIcon />
          </SidebarIcon>
          {!isCollapsed && "Tracked Devices"}
        </SidebarItem>

        <ExpandableButton onClick={() => setIsTrackingOpen(!isTrackingOpen)}>
          <SidebarIcon>
            <MapIcon />
          </SidebarIcon>
          {!isCollapsed && "Live Tracking"}
          {!isCollapsed &&
            (isTrackingOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ExpandableButton>

        {isTrackingOpen && (
          <ExpandableSection isCollapsed={isCollapsed}>
            <SidebarItem to="/livetracking" activeClassName="active">
              {!isCollapsed && "Start Tracking"}
            </SidebarItem>
            <SidebarItem to="/geofencing" activeClassName="active">
              {!isCollapsed && "Geofencing & Alerts"}
            </SidebarItem>
          </ExpandableSection>
        )}

        <SidebarItem to="/reports" activeClassName="active">
          <SidebarIcon>
            <ReportIcon />
          </SidebarIcon>
          {!isCollapsed && "Reports & Analytics"}
        </SidebarItem>

        <SidebarItem to="/alerts" activeClassName="active">
          <SidebarIcon>
            <AlertIcon />
          </SidebarIcon>
          {!isCollapsed && "Device Alerts"}
        </SidebarItem>

        <SidebarItem to="/support" activeClassName="active">
          <SidebarIcon>
            <SupportIcon />
          </SidebarIcon>
          {!isCollapsed && "Help & Support"}
        </SidebarItem>

        <SidebarItem to="/settings" activeClassName="active">
          <SidebarIcon>
            <SettingsIcon />
          </SidebarIcon>
          {!isCollapsed && "Settings"}
        </SidebarItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
