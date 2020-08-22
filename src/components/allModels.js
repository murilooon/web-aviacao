import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const AllModels = ({ models, onChange }) => {
  return (
    <div>
      <center><h1>Lista de Modelos de Avião</h1></center>
      {models.map((model) => (
        <div class="container">
          <div class="row">
            <div class="card col-sm-10">
              <h5 class="card-title">Modelo: {model.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Capacidade: {model.capacity}</h6>
              <p class="card-text">Peso: {model.weight}</p>
            </div>
            <div class="col-sm-2">
              <Button variant="dark">Editar</Button>
              <Button variant="danger" onClick={() => onChange(model)}>Deletar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

AllModels.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default AllModels;
