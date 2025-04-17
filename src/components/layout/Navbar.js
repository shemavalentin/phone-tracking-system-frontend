import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import {
  NavbarWrapper,
  StyledAppBar,
  StyledToolbar,
  Logo,
  NavLinks,
  UserProfile,
  DropdownMenu,
  DropdownItem,
  ToggleMenuButton,
} from "../../styles/NavbarStyles";

const Navbar = ({ handleSidebarToggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <NavbarWrapper>
      <StyledAppBar>
        <StyledToolbar>
          <Logo src="/logo.png" alt="Logo" onClick={() => navigate("/")} />

          <NavLinks>
            <Link to="/">Home</Link>
            <Link to="/tracking">Live Tracking</Link>
            <Link to="/history">History</Link>
            <Link to="/reports">Reports</Link>
          </NavLinks>

          <UserProfile onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <AccountCircleIcon />
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/profile">Profile</DropdownItem>
                <DropdownItem to="/logout">Logout</DropdownItem>
              </DropdownMenu>
            )}
          </UserProfile>

          <ToggleMenuButton onClick={handleSidebarToggle}>
            <MenuIcon />
          </ToggleMenuButton>
        </StyledToolbar>
      </StyledAppBar>
    </NavbarWrapper>
  );
};

export default Navbar;
