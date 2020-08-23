import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllModels from '../../components/allModels';

class Models extends Component {
  constructor(props) {
    super(props);

    const { models, redirect, redirectModel } = props;

    this.state = {
      models,
      redirect,
      redirectModel
    }

    this.handleDeleteModel = this.handleDeleteModel.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/model')
    .then(res => res.json())
    .then((data) => {
      this.setState({ models: data })
    })
    .catch(console.log)
  }

  handleDeleteModel(model) {
    var modelsArray = [...this.state.models]
    var index = modelsArray.indexOf(model)
    modelsArray.splice(index, 1)

    var id = model.modelid

    fetch(`http://localhost:3000/api/model/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())

    this.setState({models: modelsArray})

    alert("Modelo exlcuido com sucesso!")
  }

  handleRedirect(model) {
    this.setState({ redirect: true, redirectModel: model })
  }

  render () {
    return (
      <AllModels
        models={this.state.models}
        redirect={this.state.redirect}
        onChange={this.handleDeleteModel}
        setRedirect={this.handleRedirect}
        redirectModel={this.state.redirectModel}
      />
    );
  }
}

Models.propTypes = {
  models: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired
};

Models.defaultProps = {
  models: [],
  redirect: false
};

export default Models;
