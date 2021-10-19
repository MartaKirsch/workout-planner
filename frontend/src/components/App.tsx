import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { BASE_ROUTE, CALENDAR_ROUTE } from "utils/routes";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";
import { AppWrapper } from "./AppWrapper";
import LogoBar from "./LogoBar";
import MainPage from "./MainPage";
import Nav from "./Nav";
import UserContextProvider from "components/UserContext/UserContextProvider";
import Calendar from "./Calendar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <UserContextProvider>
            <AppWrapper>
              <LogoBar />
              <Switch>
                <Route exact path={BASE_ROUTE} component={MainPage} />
                <Route path={CALENDAR_ROUTE} component={Calendar} />
              </Switch>
              <Nav />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </AppWrapper>
          </UserContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
