import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import listsQuery from '../queries/listsQuery';
import listAddMutation from '../queries/listAddMutation'

class ListCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query:  listsQuery}]
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Retour</Link>
        <h3>Nouvelle liste</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Titre de la liste:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddList($title: String){
    addList(title: $title) {
      title
    }
  }
`;

export default graphql(listAddMutation)(ListCreate);