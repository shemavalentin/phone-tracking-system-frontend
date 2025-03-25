import styled from "styled-components";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

// Navbar Wrapper
export const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* Center the navbar */
  position: fixed;
  top: 0;
  z-index: 1002;
`;

// Styled AppBar
export const StyledAppBar = styled(AppBar)`
  border-radius: 10px;
  max-width: 1490px;
  width: 95%;
  height: 60px; /* Increased height for better centering */
  margin-top: 15px;
  margin-right: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center; /* Ensures the navbar content is centered */
  background-color: #1a237e !important; /* Set your desired color */
`;

// Styled Toolbar
export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%; /* Ensures full height */
  padding: 0 20px; /* Adjusted padding */
`;

// Logo
export const Logo = styled.img`
  height: 40px; /* Adjusted for better centering */
  width: auto;
  cursor: pointer;
`;

// Navigation Links
export const NavLinks = styled.div`
  display: flex;
  align-items: center; /* Center links vertically */
  margin-left: auto; /* Pushes links to the right */
  margin-right: 50px;
  a {
    color: #f5f5f5;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 15px; /* Adjust padding for better alignment */
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #52595d;
    }
  }
`;

// User Profile (Avatar + Dropdown)
export const UserProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center; /* Center avatar properly */
  cursor: pointer;
  right: 15px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid white;
  }
`;

// Dropdown Menu
export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: #e5e4e2;
  border-radius: 6px;
  box-shadow: 0px 4px 8px #2c3539;
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

// Dropdown Items
export const DropdownItem = styled(Link)`
  color: #1a237e;
  text-decoration: none;
  font-size: 14px;
  padding: 8px 10px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f5f5f5;
    border-radius: 4px;
  }
`;
