import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllEmployees from '../../components/allEmployees';

import api from '../../services/api';

class Employees extends Component {
  constructor(props) {
    super(props);

    const { employees, redirect, redirectEmployee } = props;

    this.state = {
      employees,
      redirect,
      redirectEmployee
    }

    this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    api.get('/employee')
    .then(response => {
      this.setState({ employees: response.data })
    })
    .catch(error => {
      console.log(error);
      alert('Aplicação não conseguiu se conectar ao banco!')
    })
  }

  handleDeleteEmployee(employee) {
    var employeesArray = [...this.state.employees]
    var index = employeesArray.indexOf(employee)
    employeesArray.splice(index, 1)

    var id = employee._id

    api.delete(`/employee/${id}`)
    .then(() => {
      this.setState({ employees: employeesArray })
      alert('Empregado deletado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('O Empregado não conseguiu ser deletado, verifique conexão com o banco!')
    })
  }

  handleRedirect(employee) {
    this.setState({ redirect: true, redirectEmployee: employee })
  }

  render () {
    return (
      <AllEmployees
        employees={this.state.employees}
        redirect={this.state.redirect}
        onChange={this.handleDeleteEmployee}
        setRedirect={this.handleRedirect}
        redirectEmployee={this.state.redirectEmployee}
      />
    );
  }
}

Employees.propTypes = {
  employees: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired
};

Employees.defaultProps = {
  employees: [],
  redirect: false
};

export default Employees
