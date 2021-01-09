import React, { useEffect } from "react";
import { ScoresList, ScoreLI } from "../styled";

function HighScores(props) {
  const [highScores, setHighScores] = React.useState([]);

  useEffect(() => {
    console.log("getting High Scores");

    const loadHighScores = async () => {
      try {
        const res = await fetch("/.netlify/functions/getHighScores");
        const scores = await res.json();
        setHighScores(scores);
      } catch (error) {
        console.log(error);
      }
    };

    loadHighScores();
  }, []);
  return (
    <div>
      <h1>High Scores</h1>
      <ScoresList>
        {highScores.map((score) => (
          <ScoreLI key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}

export default HighScores;
