import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ADD_EXERCISE_ROUTE, ADD_SET_ROUTE, BASE_ROUTE } from "utils/routes";
import { GlobalStyles } from "styles/global.styles";
import theme from "styles/theme";
import { AppWrapper } from "components/AppWrapper";
import LogoBar from "components/LogoBar";
import MainPage from "components/MainPage";
import Nav from "components/Nav";
import UserContextProvider from "components/UserContext/UserContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSetPage from "components/AddSetPage";
import AddExercisePage from "components/AddExercisePage";

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
                <Route path={ADD_SET_ROUTE} component={AddSetPage} />
                <Route path={ADD_EXERCISE_ROUTE} component={AddExercisePage} />
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
