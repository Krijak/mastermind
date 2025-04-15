import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import AppWrapper from "./Components/AppWrapper";
import Main from "./pages/Main";
import theme from "./theme";
import { routes } from "./variables";
import GameSetup from "./pages/GameSetup";
import Game from "./pages/Game";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <HashRouter>
      <AppWrapper>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Topbar /> */}
          <Routes>
            <Route path={routes.forside} element={<Main />} />
            <Route path={routes.main} element={<Main />} />
            <Route path={routes.gameSetup} element={<GameSetup />} />
            <Route path={routes.game} element={<Game />} />
          </Routes>
        </ThemeProvider>
      </AppWrapper>
    </HashRouter>
  );
}

export default App;
