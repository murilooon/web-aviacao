import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

const AllModels = ({ models, onChange, redirect, setRedirect, redirectModel }) => {
  return (
    <div>
      <center><h1>Lista de Modelos de Avião</h1><Button variant="dark" href="/addeditmodels">Adicionar</Button></center>
      {models.map((model, key) => (
        <div className="container" key={key}>
          <div className="row">
            <div className="card col-sm-10">
              <h5 className="card-title">Modelo: {model.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Capacidade: {model.capacity}</h6>
              <p className="card-text">Peso: {model.weight}</p>
            </div>
            <div className="col-sm-2">
            {redirect ? <Redirect to={{pathname: `/addeditmodels`, state: { referrer: redirectModel }}} /> : <div></div>}
              <Button variant="dark" onClick={() => setRedirect(model)}>Editar</Button>
              <Button variant="danger" onClick={() => onChange(model)}>Deletar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

AllModels.propTypes = {
  onChange: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired
};

export default AllModels;
