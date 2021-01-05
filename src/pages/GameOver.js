import React from "react";
import { useScore } from "../context/ScoreContext";
import { StyledLink } from "../styled";

function GameOver(props) {
  const [score] = useScore();
  if (score === -1) {
    props.history.push("/");
  }
  return (
    <div>
      <h1>Game Over</h1>
      <p>{score}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again?</StyledLink>
    </div>
  );
}

export default GameOver;
