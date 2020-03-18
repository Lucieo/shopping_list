import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import listsQuery from '../queries/listsQuery';
import listDeleteMutation from '../queries/listDeleteMutation';
import '../style/style.css';

class ListsIndex extends Component {
    onListDelete(id){
        this.props.mutate({
            variables:{id},
        })
        .then(()=>this.props.data.refetch())
    }

    renderLists(){
        return this.props.data.lists.map(({id, title})=>{
            return(
                <li key={id} className="collection-item">
                    <Link to={`/lists/${id}`}>                    {title}</Link>
                    <i className="material-icons"
                    onClick={()=>this.onListDelete(id)}
                    >
                        delete
                    </i>
                </li>
            )
        })
    }
    render(){
        if(this.props.data.loading){
            return(
                <div>Loading...</div>
            )
        }
        return(
            <div>
                <h1>Mes Listes</h1>
                <ul className='collection'>
                    {this.renderLists()}
                </ul>
                <Link
                    to="/lists/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
            )
    }
}
 
export default graphql(listDeleteMutation)(
    graphql(listsQuery)(ListsIndex)
);