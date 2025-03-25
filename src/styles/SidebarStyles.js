import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Sidebar Container
export const SidebarContainer = styled.div`
  width: ${(props) => (props.isCollapsed ? "60px" : "220px")};
  background-color: #29465b;
  height: 100vh;
  position: fixed;
  top: 80px;
  left: 25px;
  bottom: 90px;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  padding-top: 10px;
  z-index: 1001;
  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.2);
`;

// Sidebar Header
export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: center;
  font-weight: bold;
`;

// Sidebar Header Content
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Toggle Button
export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 24px;
  padding: 4px;
`;

// Sidebar Menu
export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

// Sidebar Item
export const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background 0.3s ease-in-out;
  font-size: 16px;

  &:hover {
    background: #2c3e50;
  }

  &.active {
    background: #3f51b5;
    font-weight: bold;
  }
`;

// Sidebar Icon
export const SidebarIcon = styled.div`
  margin-right: ${(props) => (props.isCollapsed ? "0" : "10px")};
  display: flex;
  align-items: center;
  font-size: 20px;
`;

// Expandable Section
export const ExpandableSection = styled.div`
  display: ${(props) => (props.isCollapsed ? "none" : "block")};
  padding-left: 20px;
  font-size: 14px;
  margin-top: 5px;
`;

// Expandable Button
export const ExpandableButton = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background 0.3s ease-in-out;
  font-size: 16px;
  cursor: pointer;
  justify-content: space-between;

  &:hover {
    background: #2c3e50;
  }
`;
