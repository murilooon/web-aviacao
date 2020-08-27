import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Models from './pages/Models';
import Airplanes from './pages/Airplanes';
import AddEditAirplanes from './pages/AddEditAirplanes';
import AddEditModels from './pages/AddEditModels';

const Routes = () => {
  return (
    <Switch>
      <Route component={Models} path="/models" />
      <Route component={Airplanes} path="/airplanes" />
      <Route component={AddEditAirplanes} path="/addeditairplanes" />
      <Route component={AddEditModels} path="/addeditmodels" />
    </Switch>
  );
}

export default Routes;
