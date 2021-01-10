import React from "react";
import { Link } from "react-router-dom";
import {
  StyledNavBrand,
  StyledNavbar,
  StyledNavItems,
  StyledLink,
  Accent,
  StyledButton,
  StyledBtn,
} from "../styled";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <StyledLink to="/">
          Beat.The.<Accent>Typist.</Accent>
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
            <StyledButton onClick={loginWithRedirect}>Login</StyledButton>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <StyledButton onClick={logout}>Logout</StyledButton>
          </li>
        )}
        <StyledBtn onClick={toggleTheme}>Toggle Theme</StyledBtn>
      </StyledNavItems>
    </StyledNavbar>
  );
}

export default Navbar;
