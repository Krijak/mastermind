import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import AppWrapper from "./Components/AppWrapper";
import Topbar from "./Components/Topbar";
import Informasjon from "./pages/Informasjon";
import Loading from "./pages/Loading";
import Main from "./pages/Main";
import Program from "./pages/Program";
import TransportOgOvernatting from "./pages/TransportOgOvernatting";
import theme from "./theme";
import { routes } from "./variables";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  return (
    <HashRouter>
      <AppWrapper setIsLoaded={setIsLoaded} setShowLoading={setShowLoading}>
        <ThemeProvider theme={theme}>
          {!isLoaded && <Loading isLoading={showLoading} />}
          <Topbar />
          {isLoaded && (
            <Routes>
              <Route path={routes.forside} element={<Main />} />
              <Route path={routes.main} element={<Main />} />
              <Route path={routes.program} element={<Program />} />
              <Route path={routes.informasjon} element={<Informasjon />} />
              <Route
                path={routes.transportOgOvernatting}
                element={<TransportOgOvernatting />}
              />
            </Routes>
          )}
        </ThemeProvider>
      </AppWrapper>
    </HashRouter>
  );
}

export default App;
