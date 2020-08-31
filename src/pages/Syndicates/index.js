import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllSyndicates from '../../components/allSyndicates';

import api from '../../services/api';

class Syndicates extends Component {
  constructor(props) {
    super(props);

    const { syndicates, redirect, redirectSyndicate } = props;

    this.state = {
      syndicates,
      redirect,
      redirectSyndicate
    }

    this.handleDeleteSyndicate = this.handleDeleteSyndicate.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
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

  handleDeleteSyndicate(syndicate) {
    var syndicatesArray = [...this.state.syndicates]
    var index = syndicatesArray.indexOf(syndicate)
    syndicatesArray.splice(index, 1)

    var id = syndicate.syndicate_id

    api.delete(`/syndicate/${id}`)
    .then(() => {
      this.setState({ syndicates: syndicatesArray })
      alert('Sindicato deletado com sucesso!')
    })
    .catch(error => {
      console.log(error);
      alert('O sindicato não conseguiu ser deletado!')
    })
  }

  handleRedirect(syndicate) {
    this.setState({ redirect: true, redirectSyndicate: syndicate })
  }

  render () {
    return (
      <AllSyndicates
        syndicates={this.state.syndicates}
        redirect={this.state.redirect}
        onChange={this.handleDeleteSyndicate}
        setRedirect={this.handleRedirect}
        redirectSyndicate={this.state.redirectSyndicate}
      />
    );
  }
}

Syndicates.propTypes = {
  syndicates: PropTypes.array.isRequired,
  redirect: PropTypes.bool.isRequired
};

Syndicates.defaultProps = {
  syndicates: [],
  redirect: false
};

export default Syndicates;
