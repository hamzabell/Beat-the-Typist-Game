import React, { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContext";
import { StyledCharacter, StyledLink, StyledTitle } from "../styled";

function GameOver(props) {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
  if (score === -1) {
    props.history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({ name: "Akan", score }),
        };

        const res = await fetch("/.netlify/functions/saveHighScore", options);

        console.log(res);
        const data = await res.json();
        setScoreMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    saveHighScore();
  }, [score]);

  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again?</StyledLink>
      </div>
    </div>
  );
}

export default GameOver;
