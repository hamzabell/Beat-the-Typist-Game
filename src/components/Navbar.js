import React from "react";
import { Link } from "react-router-dom";
import {
  StyledNavBrand,
  StyledNavbar,
  StyledNavItems,
  StyledLink,
  Accent,
} from "../styled";

function Navbar(props) {
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
      </StyledNavItems>
    </StyledNavbar>
  );
}

export default Navbar;
