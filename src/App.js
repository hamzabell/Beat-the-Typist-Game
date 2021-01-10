import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Container, Main, Global, lightTheme, darkTheme } from "./styled";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

function App() {
  const { isLoading, user } = useAuth0();

  const theme = "light";
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <Global />
        <Main>
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <Container>
              <Navbar />
              <Switch>
                <Route path="/game" component={Game} />
                <Route path="/highScores" component={HighScores} />
                <Route path="/gameOver" component={GameOver} />
                <Route path="/" exact component={Home} />
              </Switch>
            </Container>
          )}
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
