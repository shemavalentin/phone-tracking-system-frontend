import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Sidebar Container
export const SidebarContainer = styled.div`
  width: ${(props) => (props.isCollapsed ? "60px" : "220px")};
  background-color: #29465b;
  height: 100vh;
  position: fixed;
  top: 80px;
  left: ${(props) => (props.isMobileOpen ? "0" : "-250px")};
  bottom: 0px;
  color: white;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
  padding-top: 10px;
  z-index: 1001;
  box-shadow: 3px 0 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 769px) {
    left: 25px;
  }
`;

// Sidebar Header
export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: center;
  font-weight: bold;

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
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

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

// Sidebar Menu
export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  @media (max-width: 480px) {
    padding: 8px;
  }
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

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

// Sidebar Icon
export const SidebarIcon = styled.div`
  margin-right: ${(props) => (props.isCollapsed ? "0" : "10px")};
  display: flex;
  align-items: center;
  font-size: 20px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

// Expandable Section
export const ExpandableSection = styled.div`
  display: ${(props) => (props.isCollapsed ? "none" : "block")};
  padding-left: 20px;
  font-size: 14px;
  margin-top: 5px;

  @media (max-width: 480px) {
    padding-left: 16px;
    font-size: 13px;
  }
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

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

// Backdrop overlay for mobile
export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
