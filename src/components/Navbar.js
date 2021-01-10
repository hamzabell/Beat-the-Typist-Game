import React from "react";
import { Link } from "react-router-dom";
import {
  StyledNavBrand,
  StyledNavbar,
  StyledNavItems,
  StyledLink,
  Accent,
} from "../styled";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <StyledLink to="/">
          Learn.Build.<Accent>Type.</Accent>
        </StyledLink>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highScores">High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <li>
            <button onClick={loginWithRedirect}>Login</button>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
        <button onClick={toggleTheme}>Toggle Theme</button>
      </StyledNavItems>
    </StyledNavbar>
  );
}

export default Navbar;
