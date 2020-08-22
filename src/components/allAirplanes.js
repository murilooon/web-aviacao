import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const AllAirplanes = ({ airplanes, onChange }) => {
  return (
    <div>
      <center><h1>Lista de Aviões</h1></center>
      {airplanes.map((airplane) => (
        <div class="container">
          <div class="row">
            <div class="card col-sm-10">
              <h5 class="card-title">Numero Serial: {airplane.serialnumber}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Modelo: {airplane.modelid}</h6>
            </div>
            <div class="col-sm-2">
              <Button variant="dark">Editar</Button>
              <Button variant="danger" onClick={() => onChange(airplane)}>Deletar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

AllAirplanes.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default AllAirplanes
