import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import listDetailsQuery from '../queries/listDetailsQuery';
import {Link} from 'react-router';
import ItemCreate from './ItemCreate';
import ItemList from './ItemList';

class ListDetails extends Component{
    render(){
        const {list} = this.props.data;
        if(!list){
            return <div>Chargement...</div>
        }
        return(
            <div>
                <Link to='/'>Retour</Link>
                <h3>{list.title}</h3>
                <ItemList items={list.items} listId={list.id}/>
                <ItemCreate listId={list.id}/>
            </div>
        )
    }
}



export default graphql(listDetailsQuery, {
    options: (props)=>{return{variables:{
        id: props.params.id
    }}}
})(ListDetails);