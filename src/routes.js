import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Models from './pages/Models';
import Airplanes from './pages/Airplanes';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Models} path="/models" />
      <Route component={Airplanes} path="/airplanes" />
    </BrowserRouter>
  );
}

export default Routes;
