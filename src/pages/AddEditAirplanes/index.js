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
        models: [],
        isNewAirplane: false,
        airplane: edit.referrer,
        redirect: false
      }
    } else {
      this.state = {
        models: [],
        isNewAirplane: true,
        airplane: '',
        redirect: false
      }
    }

    this.addAirplane = this.addAirplane.bind(this);
    this.updateAirplane = this.updateAirplane.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    api.get('/model')
    .then(response => {
      this.setState({ models: response.data })
    })
    .catch(error => {
      console.log(error);
      alert('Aplicação não conseguiu se conectar ao banco!')
    })
  }

  addAirplane(model, serial_number) {
    api.post('/airplane', {
      model_id: model,
      serial_number: serial_number
    })
    .then(() => {
      alert('Avião criado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao criar avião, verifique se existe um modelo com essa ID!')
    })
  }

  updateAirplane(model, serial_number) {
    const { airplane } = this.state;

    api.put(`/airplane/${airplane.register_id}`, {
      model_id: model,
      serial_number: serial_number
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
    var serial_number = form.elements.formBasicserial_number.value

    isNewAirplane ? this.addAirplane(model, serial_number) : this.updateAirplane(model, serial_number)

    this.setState({ redirect: true })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/airplanes' />
    }
  }

  render () {
    const { airplane, isNewAirplane, models } = this.state;

    return (
      <div className="container">
        <center><h1>{isNewAirplane ? "Adicionar" : "Editar"} Avião</h1></center>

        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formBasicserial_number">
            <Form.Label>Número Serial</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Digite o número serial"
              defaultValue={airplane.serial_number}
            />
          </Form.Group>

          <Form.Group controlId="formBasicModel">
            <Form.Label>ID do Modelo</Form.Label>
            <Form.Control as="select">
              {models.map((model, key) => (
                <option key={key}>{model.model_id}</option>
              ))}
            </Form.Control>
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
