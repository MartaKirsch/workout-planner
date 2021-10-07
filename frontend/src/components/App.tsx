import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../styles/global.styles";
import theme from "../styles/theme";
import { AppWrapper } from "./AppWrapper";
import LogInPage from "./LogInPage";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Switch>
              <Route exact path="/" component={LogInPage} />
            </Switch>
            <Nav />
          </AppWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
