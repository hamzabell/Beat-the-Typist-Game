import React, { useState, useEffect, useCallback } from "react";
import { useScore } from "../context/ScoreContext";
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
  Strong,
} from "../styled";

function Game(props) {
  const [score, setScore] = useScore();
  const MAX_SECONDS = 15;
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const [currentChar, setCurrentChar] = useState("");
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    setRandomCharacter();
    setScore(0);
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
  }, []);

  const updateTime = (startTime) => {
    const endDate = new Date();
    const msPassedStr = (endDate.getTime() - startTime.getTime()).toString();
    const formattedMsString = ("0000" + msPassedStr).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMsString.substring(0, 2)) - 1;

    const updatedMs =
      1000 -
      parseInt(formattedMsString.substring(formattedMsString.length - 3));

    setSeconds(addLeadingZeros(updatedSeconds));
    setMs(addLeadingZeros(updatedMs));
  };

  const addLeadingZeros = (num, length) => {
    let zeros = "";
    for (let i = 0; i < length; i++) {
      zeros += "0";
    }

    return (zeros + num).slice(-length);
  };

  useEffect(() => {
    if (seconds <= -1) {
      props.history.push("/gameOver");
    }
  }, [seconds, ms]);

  const keyUpHandler = useCallback(
    (e) => {
      if (e.key === currentChar) {
        setScore((prev) => prev + 1);
      } else {
        if (score > 0) {
          setScore((prev) => prev - 1);
        }
      }

      setRandomCharacter();
    },
    [currentChar]
  );
  useEffect(() => {
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keyUpHandler]);

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentChar(characters[randomInt]);
  };
  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentChar}</StyledCharacter>
      <StyledTimer>
        Time:{" "}
        <Strong>
          {seconds}:{ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}

export default Game;
