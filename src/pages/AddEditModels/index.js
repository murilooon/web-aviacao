import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

class AddEditModels extends Component {
  constructor(props) {
    super(props);

    var edit = this.props.location.state;

    if(edit) {
      this.state = {
        isNewModel: false,
        model: edit.referrer,
        redirect: false
      }
    } else {
      this.state = {
        isNewModel: true,
        model: '',
        redirect: false
      }
    }

    this.addModel = this.addModel.bind(this);
    this.updateModel = this.updateModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addModel(name, capacity, weight) {
    api.post('/model', {
      name: name,
      capacity: capacity,
      weight: weight
    })
    .then(() => {
      alert('Modelo criado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao criar modelo, verifique conexão com o banco!')
    })
  }

  updateModel(name, capacity, weight) {
    const { model } = this.state;

    api.put(`/model/${model.model_id}`, {
      name: name,
      capacity: capacity,
      weight: weight
    })
    .then(() => {
      alert('Modelo editado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao editar modelo, verifique conexão com o banco!')
    })
  }

  handleSubmit(event) {
    const { isNewModel } = this.state;

    var form = event.target
    var name = form.elements.formBasicName.value
    var capacity = form.elements.formBasicCapacity.value
    var weight = form.elements.formBasicWeight.value

    isNewModel ? this.addModel(name, capacity, weight) : this.updateModel(name, capacity, weight)

    this.setState({ redirect: true })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/models' />
    }
  }

  render () {
    const { model, isNewModel } = this.state;

    return (
      <div className="container">
        <center><h1>{isNewModel ? "Adicionar" : "Editar"} Modelo</h1></center>

        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o nome"
              defaultValue={model.name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCapacity">
            <Form.Label>Capacidade</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Digite a capacidade"
              defaultValue={model.capacity}
            />
          </Form.Group>

          <Form.Group controlId="formBasicWeight">
            <Form.Label>Peso</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Digite o peso"
              defaultValue={model.weight}
            />
          </Form.Group>

          {this.renderRedirect()}
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddEditModels
