import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { BASE_ROUTE, CALENDAR_ROUTE } from "utils/routes";
import { GlobalStyles } from "../styles/global.styles";
import theme from "../styles/theme";
import { AppWrapper } from "./AppWrapper";
import LogInPage from "./LogInPage";
import LogoBar from "./LogoBar";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <LogoBar />
            <Switch>
              <Route exact path={BASE_ROUTE} component={LogInPage} />
              <Route path={CALENDAR_ROUTE} component={LogInPage} />
            </Switch>
            <Nav />
          </AppWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
