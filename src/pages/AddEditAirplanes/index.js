import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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
    fetch('http://localhost:3000/api/airplane', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'modelId': model, 'serialNumber': serialNumber})
    });
  }

  updateAirplane(model, serialNumber) {
    const { airplane } = this.state;

    fetch(`http://localhost:3000/api/airplane/${airplane.registerid}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'modelId': model, 'serialNumber': serialNumber})
    });
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
            <Form.Label>Serial Number</Form.Label>
            <Form.Control type="serialNumber" placeholder="Digite o numero serial" defaultValue={airplane.serialnumber} />
          </Form.Group>

          <Form.Group controlId="formBasicModel">
            <Form.Label>Modelo</Form.Label>
            <Form.Control type="model" placeholder="Modelo" defaultValue={airplane.modelid} />
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
