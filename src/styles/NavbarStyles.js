import styled from "styled-components";
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

// Navbar Wrapper
export const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1002;
`;

// Styled AppBar
export const StyledAppBar = styled(AppBar)`
  border-radius: 10px;
  max-width: 1490px;
  width: 95%;
  height: 60px;
  margin-top: 15px;
  margin-right: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  background-color: #1a237e !important;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
    height: 55px;
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`;

// Styled Toolbar
export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

// Logo
export const Logo = styled.img`
  height: 40px;
  width: auto;
  cursor: pointer;

  @media (max-width: 480px) {
    height: 30px;
  }
`;

// Navigation Links
export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 50px;

  a {
    color: #f5f5f5;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 15px;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #52595d;
    }

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 6px 10px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
      padding: 4px 6px;
    }
  }

  @media (max-width: 768px) {
    margin-right: 20px;
  }

  @media (max-width: 480px) {
    display: none; /* Hide links on small screens for mobile menu */
  }
`;

// User Profile (Avatar + Dropdown)
export const UserProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  right: 15px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid white;

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
      border: 4px solid white;
    }

    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
      border: 3px solid white;
    }
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

  @media (max-width: 480px) {
    width: 130px;
    top: 45px;
  }
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

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 6px 8px;
  }
`;
