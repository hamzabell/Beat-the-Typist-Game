import React, { useEffect, useState } from "react";
import { useScore } from "../context/ScoreContext";
import { StyledCharacter, StyledLink, StyledTitle } from "../styled";
import { useAuth0 } from "@auth0/auth0-react";
function GameOver(props) {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState("");
  if (score === -1) {
    props.history.push("/");
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(user);
        const options = {
          method: "POST",
          body: JSON.stringify({ name: "Akan", score }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch("/.netlify/functions/saveHighScore", options);

        const data = await res.json();
        setScoreMessage(data.message);
      } catch (err) {
        console.log(err);
      }
    };
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [score]);

  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && (
        <h2>You should Login or Signup to compete for highscores</h2>
      )}
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
