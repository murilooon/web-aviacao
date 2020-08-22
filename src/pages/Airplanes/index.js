import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllAirplanes from '../../components/allAirplanes';

class Airplanes extends Component {
  constructor(props) {
    super(props);

    const { airplanes } = props;

    this.state = {
      airplanes
    }

    this.handleDeleteAirplane = this.handleDeleteAirplane.bind(this);
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

    this.setState({airplanes: airplanesArray})

    alert("Avião exlcuido com sucesso!")
  }

  render () {
    return (
      <AllAirplanes airplanes={this.state.airplanes} onChange={this.handleDeleteAirplane} />
    );
  }
}

Airplanes.propTypes = {
  airplanes: PropTypes.array.isRequired
};

Airplanes.defaultProps = {
  airplanes: []
};

export default Airplanes
