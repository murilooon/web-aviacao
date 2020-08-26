import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllModels from '../../components/allModels';

import api from '../../services/api';

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
    api.get('/model')
    .then(response => {
      this.setState({ models: response.data })
    })
    .catch(error => {
      console.log(error);
      alert('Aplicação não conseguiu se conectar ao banco!')
    })
  }

  handleDeleteModel(model) {
    var modelsArray = [...this.state.models]
    var index = modelsArray.indexOf(model)
    modelsArray.splice(index, 1)

    var id = model.model_id

    api.delete(`/model/${id}`)
    .then(() => {
      this.setState({ models: modelsArray })
      alert('Modelo deletado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('O modelo não conseguiu ser deletado!')
    })
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
