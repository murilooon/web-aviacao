import React, {Component} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';

class AddEditEmployees extends Component {
  constructor(props) {
    super(props);

    var edit = this.props.location.state;

    if(edit) {
      this.state = {
        syndicates: [],
        isNewEmployee: false,
        employee: edit.referrer,
        redirect: false
      }
    } else {
      this.state = {
        syndicates: [],
        isNewEmployee: true,
        employee: '',
        redirect: false
      }
    }

    this.addEmployee = this.addEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    api.get('/syndicate')
    .then(response => {
      this.setState({ syndicates: response.data })
    })
    .catch(error => {
      console.log(error);
      alert('Aplicação não conseguiu se conectar ao banco!')
    })
  }

  addEmployee(syndicate, name, address, phone, salary) {
    api.post('/employee', {
      syndicate_id: syndicate,
      name: name,
      address: address,
      phone: phone,
      salary: salary
    })
    .then(() => {
      alert('Empregado criado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao criar empregado, verifique se existe um sindicato com essa ID!')
    })
  }

  updateEmployee(syndicate, name, address, phone, salary) {
    const { employee } = this.state;

    api.put(`/employee/${employee.employee_id}`, {
        syndicate_id: syndicate,
        name: name,
        address: address,
        phone: phone,
        salary: salary
    })
    .then(() => {
      alert('Empregado editado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao editar empregado, verifique se existe um sindicato com essa ID!')
    })
  }

  handleSubmit(event) {
    const { isNewEmployee } = this.state;

    var form = event.target
    var syndicate = form.elements.formBasicSyndicate.value
    var name = form.elements.formBasicName.value
    var address = form.elements.formBasicAddress.value
    var phone = form.elements.formBasicPhone.value
    var salary = form.elements.formBasicSalary.value

    isNewEmployee ? this.addEmployee(syndicate, name, address, phone, salary) : this.updateEmployee(syndicate, name, address, phone, salary)

    this.setState({ redirect: true })
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/employees' />
    }
  }

  render () {
    const { employee, isNewEmployee, syndicates } = this.state;

    return (
      <div className="container">
        <center><h1>{isNewEmployee ? "Adicionar" : "Editar"} Empregado</h1></center>

        <Form onSubmit={this.handleSubmit} >
          <Form.Group controlId="formBasicSyndicate">
            <Form.Label>ID do Sindicato</Form.Label>
            <Form.Control as="select">
              {syndicates.map((syndicate, key) => (
                <option key={key}>{syndicate.syndicate_id}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o nome"
              defaultValue={employee.name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o endereço"
              defaultValue={employee.address}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPhone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Digite o telefone"
              defaultValue={employee.phone}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSalary">
            <Form.Label>Salário</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Digite o salário"
              defaultValue={employee.salary}
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

export default AddEditEmployees
