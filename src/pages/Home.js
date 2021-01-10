import React, { useEffect } from "react";
import { CTA, Accent, StyledTitle } from "../styled";

function Home(props) {
  const keyHandler = (e) => {
    if (e.key === "s") {
      props.history.push("/game");
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", keyHandler);

    return () => {
      document.removeEventListener("keyup", keyHandler);
    };
  }, [keyHandler]);

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
