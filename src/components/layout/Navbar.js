import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  NavbarWrapper,
  StyledAppBar,
  StyledToolbar,
  Logo,
  NavLinks,
  UserProfile,
  DropdownMenu,
  DropdownItem,
} from "../../styles/NavbarStyles";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <NavbarWrapper>
      <StyledAppBar>
        <StyledToolbar>
          {/* Click the logo redirects to Home */}
          <Logo src="/logo.png" alt="Logo" onClick={() => navigate("/")} />
          <NavLinks>
            <Link to="/">Home</Link>
            <Link to="/tracking">Live Tracking</Link>
            <Link to="/history">History</Link>
            <Link to="/reports">Reports</Link>
            {/* <Link to="/settings">Settings</Link> */}
          </NavLinks>

          {/* User Profile with Dropdown */}
          <UserProfile onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <AccountCircleIcon />

            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/profile">Profile</DropdownItem>
                <DropdownItem to="/logout">Logout</DropdownItem>
              </DropdownMenu>
            )}
          </UserProfile>
        </StyledToolbar>
      </StyledAppBar>
    </NavbarWrapper>
  );
};

export default Navbar;
