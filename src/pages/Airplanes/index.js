import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllAirplanes from '../../components/allAirplanes';

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
    fetch('http://localhost:3000/api/airplane')
    .then(res => res.json())
    .then((data) => {
      this.setState({ airplanes: data })
    })
    .catch(console.log)
  }

  handleDeleteAirplane(airplane) {
    var airplanesArray = [...this.state.airplanes]
    var index = airplanesArray.indexOf(airplane)
    airplanesArray.splice(index, 1)

    var id = airplane.registerid

    fetch(`http://localhost:3000/api/airplane/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())

    this.setState({ airplanes: airplanesArray })

    alert("Avião exlcuido com sucesso!")
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
