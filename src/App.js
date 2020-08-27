import React, {Component} from 'react';
import Routes from './routes';
import NavbarHeader from './components/navbar';
import { Router, Route, Switch } from "react-router-dom";
// import Loading from "./components/Loading";

import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Router history={history}>
      <NavbarHeader />
      <Routes />
    </Router>
  );
};

export default App;
