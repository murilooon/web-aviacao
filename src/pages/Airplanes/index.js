import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllAirplanes from '../../components/allAirplanes';

import api from '../../services/api';

class Airplanes extends Component {
  constructor(props) {
    super(props);

    const { airplanes, redirect, redirectAirplane } = props;

    this.state = {
      airplanes,
      redirect,
      redirectAirplane
    }

    this.handleDeleteAirplane = this.handleDeleteAirplane.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    api.get('/airplane')
    .then(response => {
      this.setState({ airplanes: response.data })
    })
    .catch(error => {
      console.log(error);
      alert('Aplicação não conseguiu se conectar ao banco!')
    })
  }

  handleDeleteAirplane(airplane) {
    var airplanesArray = [...this.state.airplanes]
    var index = airplanesArray.indexOf(airplane)
    airplanesArray.splice(index, 1)

    var id = airplane.registerid

    api.delete(`/airplane/${id}`)
    .then(() => {
      this.setState({ airplanes: airplanesArray })
      alert('Avião deletado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('O avião não conseguiu ser deletado, verifique conexão com o banco!')
    })
  }

  handleRedirect(airplane) {
    this.setState({ redirect: true, redirectAirplane: airplane })
  }

  render () {
    return (
      <AllAirplanes
        airplanes={this.state.airplanes}
        redirect={this.state.redirect}
        onChange={this.handleDeleteAirplane}
        setRedirect={this.handleRedirect}
        redirectAirplane={this.state.redirectAirplane}
      />
    );
  }
}

Airplanes.propTypes = {
  airplanes: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired
};

Airplanes.defaultProps = {
  airplanes: [],
  redirect: false
};

export default Airplanes
