import React, { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContext";
import { StyledCharacter, StyledLink } from "../styled";

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
  }, []);

  return (
    <div>
      <h1>Game Over</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{scoreMessage}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again?</StyledLink>
    </div>
  );
}

export default GameOver;
