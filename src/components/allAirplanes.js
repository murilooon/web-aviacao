import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import './styles.css';

export const AllAirplanes = ({ airplanes, onChange, redirect, setRedirect, redirectAirplane }) => {
  return (
    <div>
      <div className="title">
        <h1>Lista de de Aviões</h1>
        <Button variant="dark" href="/addeditairplanes">Adicionar novo avião</Button>
      </div>

      {airplanes.map((airplane, key) => (
        <div className="container" key={key}>
          <div className="row">
            <div className="card col-sm-10 padding">
              <h5 className="card-title">Numero Serial: {airplane.serialnumber}</h5>
              <h6 className="card-subtitle text-muted">ID do Modelo: {airplane.modelid}</h6>
            </div>
            <div className="col-sm-2 button">
              {redirect ? <Redirect to={{pathname: `/addeditairplanes`, state: { referrer: redirectAirplane }}} /> : <div></div>}
              <Button variant="dark" onClick={() => setRedirect(airplane)}>Editar</Button>
              <Button variant="danger" onClick={() => onChange(airplane)}>Deletar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

AllAirplanes.propTypes = {
  onChange: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired
};

export default AllAirplanes
