import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Models from './pages/Models';
import Airplanes from './pages/Airplanes';
import Syndicates from './pages/Syndicates';
import Employees from './pages/Employees';
import AddEditAirplanes from './pages/AddEditAirplanes';
import AddEditModels from './pages/AddEditModels';
import AddEditSyndicates from './pages/AddEditSyndicates';
import AddEditEmployees from './pages/AddEditEmployees';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Models} path="/models" />
      <Route component={Airplanes} path="/airplanes" />
      <Route component={Syndicates} path="/syndicates" />
      <Route component={Employees} path="/employees" />
      <Route component={AddEditAirplanes} path="/addeditairplanes" />
      <Route component={AddEditModels} path="/addeditmodels" />
      <Route component={AddEditSyndicates} path="/addeditsyndicates" />
      <Route component={AddEditEmployees} path="/addeditemployees" />
    </BrowserRouter>
  );
}

export default Routes;
