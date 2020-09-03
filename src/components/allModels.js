import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import './styles.css';

const AllModels = ({ models, onChange, redirect, setRedirect, redirectModel }) => {
  return (
    <div>
      <div className="title">
        <h1>Lista de Modelos de Avião</h1>
        <Button variant="dark" href="/addeditmodels">Adicionar novo modelo</Button>
      </div>

      {models.map((model, key) => (
        <div className="container" key={key}>
          <div className="row">
            <div className="card col-sm-10 padding">
              <h5 className="card-title">Modelo: {model.name}</h5>
              <p className="card-text">Capacidade: {model.capacity}</p>
              <p className="card-text">Peso: {model.weight}</p>
              <p className="card-text">ID do modelo: {model.model_id}</p>
              <p className="card-text">Atualizado em: { model.updated_at.replace('T', ' ').substr(0, 19) }</p>
            </div>
            <div className="col-sm-2 button">
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
