import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

class AddEditAirplanes extends Component {
  constructor(props) {
    super(props);

    var edit = this.props.location.state;

    if(edit) {
      this.state = {
        isNewAirplane: false,
        airplane: edit.referrer,
        redirect: false
      }
    } else {
      this.state = {
        isNewAirplane: true,
        airplane: '',
        redirect: false
      }
    }

    this.addAirplane = this.addAirplane.bind(this);
    this.updateAirplane = this.updateAirplane.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addAirplane(model, serialNumber) {
    api.post('/airplane', {
      modelId: model,
      serialNumber: serialNumber
    })
    .then(() => {
      alert('Avião criado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao criar avião, verifique se existe um modelo com essa ID!')
    })
  }

  updateAirplane(model, serialNumber) {
    const { airplane } = this.state;

    api.put(`/airplane/${airplane.registerid}`, {
      modelId: model,
      serialNumber: serialNumber
    })
    .then(() => {
      alert('Avião editado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao editar avião, verifique se existe um modelo com essa ID!')
    })
  }

  handleSubmit(event) {
    const { isNewAirplane } = this.state;

    var form = event.target
    var model = form.elements.formBasicModel.value
    var serialNumber = form.elements.formBasicSerialNumber.value

    isNewAirplane ? this.addAirplane(model, serialNumber) : this.updateAirplane(model, serialNumber)

    this.setState({ redirect: true })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/airplanes' />
    }
  }

  render () {
    const { airplane, isNewAirplane } = this.state;

    return (
      <div className="container">
        <center><h1>{isNewAirplane ? "Adicionar" : "Editar"} Avião</h1></center>

        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formBasicSerialNumber">
            <Form.Label>Número Serial</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Digite o número serial"
              defaultValue={airplane.serialnumber}
            />
          </Form.Group>

          <Form.Group controlId="formBasicModel">
            <Form.Label>ID do Modelo</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Digite a ID do modelo"
              defaultValue={airplane.modelid}
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

export default AddEditAirplanes
