import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import './styles.css';

const AllEmployees = ({ employees, onChange, redirect, setRedirect, redirectEmployee }) => {
  return (
    <div>
      <div className="title">
        <h1>Lista de Empregados</h1>
        <Button variant="dark" href="/addeditemployees">Adicionar novo empregado</Button>
      </div>

      {employees.map((employee, key) => (
        <div className="container" key={key}>
          <div className="row">
            <div className="card col-sm-10 padding">
              <h5 className="card-title">Nome: {employee.name}</h5>
              <p className="card-text">ID do Empregado: {employee.employee_id}</p>
              <p className="card-text">Sindicato: {employee.syndicate_id}</p>
              <p className="card-text">Endereço: {employee.address}</p>
              <p className="card-text">Telefone: {employee.phone}</p>
              <p className="card-text">Salário: {employee.salary}</p>
              <p className="card-text">Atualizado em: { employee.updated_at.replace('T', ' ').substr(0, 19) }</p>
            </div>
            <div className="col-sm-2 button">
              {redirect ? <Redirect to={{pathname: `/addeditemployees`, state: { referrer: redirectEmployee }}} /> : <div></div>}
              <Button variant="dark" onClick={() => setRedirect(employee)}>Editar</Button>
              <Button variant="danger" onClick={() => onChange(employee)}>Deletar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

AllEmployees.propTypes = {
  onChange: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired
};

export default AllEmployees;
