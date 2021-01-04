import React from "react";
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
  Strong,
} from "../styled";

function Game(props) {
  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>0</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time: <Strong>00:30</Strong>
      </StyledTimer>
    </StyledGame>
  );
}

export default Game;
