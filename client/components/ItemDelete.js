import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import itemDeleteMutation from '../queries/itemDeleteMutation';

class ItemDelete extends Component {
    onDelete(itemId, listId){
        this.props.mutate({
            variables:{
                itemId, 
                listId
            }
        })
    }

    render(){
        return(
            <i 
                onClick={()=>this.onDelete(this.props.itemId, this.props.listId)}
                className='material-icons'>
                    delete
           </i>
        )
    }
}

export default graphql(itemDeleteMutation)(ItemDelete);