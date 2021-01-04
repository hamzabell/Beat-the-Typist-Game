import React from "react";
import { CTA, Accent, StyledTitle } from "../styled";

function Home(props) {
  return (
    <div>
      <StyledTitle>Ready to type?</StyledTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> start playing!
      </CTA>
    </div>
  );
}

export default Home;
