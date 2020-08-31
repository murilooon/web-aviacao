import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import './styles.css';

export const AllSyndicates = ({ syndicates, onChange, redirect, setRedirect, redirectSyndicate }) => {
  return (
    <div>
      <div className="title">
        <h1>Lista de Sindicatos</h1>
        <Button variant="dark" href="/addeditsyndicates">Adicionar novo sindicato</Button>
      </div>

      {syndicates.map((syndicate, key) => (
        <div className="container" key={key}>
          <div className="row">
            <div className="card col-sm-10 padding">
              <h5 className="card-title">Nome: {syndicate.name}</h5>
              <h6 className="card-subtitle text-muted">ID do Sindicato: {syndicate.syndicate_id}</h6>
            </div>
            <div className="col-sm-2 button">
              {redirect ? <Redirect to={{pathname: `/addeditsyndicates`, state: { referrer: redirectSyndicate }}} /> : <div></div>}
              <Button variant="dark" onClick={() => setRedirect(syndicate)}>Editar</Button>
              <Button variant="danger" onClick={() => onChange(syndicate)}>Deletar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

AllSyndicates.propTypes = {
  onChange: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired
};

export default AllSyndicates;
