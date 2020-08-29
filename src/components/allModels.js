import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import './styles.css';

export const AllModels = ({ models, onChange, redirect, setRedirect, redirectModel }) => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const parsedTheme = localStorage.getItem("theme")
    setTheme(parsedTheme)
  }, [])

  return (
    <div>
      <div className="title">
        <h1>Lista de Modelos de Avião</h1>
        <Button variant="dark" href="/addeditmodels">Adicionar novo modelo</Button>
      </div>

      {models.map((model, key) => (
        <div className="container" key={key}>
          <div className="row">
            <Card
              bg={theme}
              text={theme === 'light' ? 'dark' : 'white'}
              className="card col-sm-10 padding"
            >
              <Card.Title>Modelo: {model.name}</Card.Title>
              <Card.Text>Capacidade: {model.capacity}</Card.Text>
              <Card.Text>Peso: {model.weight}</Card.Text>
              <Card.Text>ID do modelo: {model.model_id}</Card.Text>
              <Card.Text>Atualizado em: { model.updated_at.replace('T', ' ').substr(0, 19) }</Card.Text>
            </Card>
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
