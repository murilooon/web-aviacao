import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

class AddEditSyndicates extends Component {
  constructor(props) {
    super(props);

    var edit = this.props.location.state;

    if(edit) {
      this.state = {
        isNewSyndicate: false,
        syndicate: edit.referrer,
        redirect: false
      }
    } else {
      this.state = {
        isNewSyndicate: true,
        syndicate: '',
        redirect: false
      }
    }

    this.addSyndicate = this.addSyndicate.bind(this);
    this.updateSyndicate = this.updateSyndicate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addSyndicate(name) {
    api.post('/syndicate', {
      name: name
    })
    .then(() => {
      alert('Sindicato criado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao criar sindicato, verifique conexão com o banco!')
    })
  }

  updateSyndicate(name) {
    const { syndicate } = this.state;

    api.put(`/syndicate/${syndicate._id}`, {
      name: name
    })
    .then(() => {
      alert('Sindicato editado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao editar sindicato, verifique conexão com o banco!')
    })
  }

  handleSubmit(event) {
    const { isNewSyndicate } = this.state;

    var form = event.target
    var name = form.elements.formBasicName.value

    isNewSyndicate ? this.addSyndicate(name) : this.updateSyndicate(name)

    this.setState({ redirect: true })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/syndicates' />
    }
  }

  render () {
    const { syndicate, isNewSyndicate } = this.state;

    return (
        <div className="container">
          <center><h1>{isNewSyndicate ? "Adicionar" : "Editar"} Sindicato</h1></center>

          <Form onSubmit={this.handleSubmit} >
            <Form.Group controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Digite o nome"
                defaultValue={syndicate.name}
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

export default AddEditSyndicates
