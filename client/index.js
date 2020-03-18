import React from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import App from './components/App';
import ListsIndex from './components/ListsIndex';
import ListCreate from './components/ListCreate';
import ListDetails from './components/ListDetails';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
})


const Root = () => {
  return(
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}> 
          <IndexRoute component={ListsIndex}/>
          <Route path="lists/new" component={ListCreate}/>
          <Route path="lists/:id" component={ListDetails}/>
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
