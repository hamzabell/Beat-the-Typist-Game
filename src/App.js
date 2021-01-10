import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./pages/Game";
import HighScores from "./pages/HighScores";
import GameOver from "./pages/GameOver";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Container, Main, Global } from "./styled";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
function App() {
  const { isLoading, user } = useAuth0();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (isLoading) {
    return <p>loading..</p>;
  }

  return (
    <Router>
      <Global />
      <Main>
        <Container>
          <Navbar />
          <Switch>
            <Route path="/game" component={Game} />
            <Route path="/highScores" component={HighScores} />
            <Route path="/gameOver" component={GameOver} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
