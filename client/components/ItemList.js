import React, {Component} from 'react';
import ItemDelete from './ItemDelete';
import {graphql} from 'react-apollo';
import itemModifyQtyMutation from '../queries/itemModifyQtyMutation';
import '../style/style.css';

class ItemList extends Component{
    onModifyQuantity(id, quantity){
        this.props.mutate({
            variables:{
                id, 
                quantity, 
                listId: this.props.listId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                modifyItemQuantity:{
                    id,
                    __typename: 'ItemType',
                    quantity
                }
            }
        })
    }

    renderItems(){
        return this.props.items.map(({id, content, quantity})=>{
            return(
                <li key={id}
                className="collection-item"
                >
                    {content}
                    <div className="vote-box">
                        {
                            quantity>1 &&
                            <i className='material-icons'
                            onClick={()=>this.onModifyQuantity(id, quantity-1)}
                            >
                                remove
                            </i>
                        }
                        {quantity}
                        <i className='material-icons'
                        onClick={()=>this.onModifyQuantity(id, quantity+1)}
                        >
                            add
                        </i>
                        <ItemDelete listId={this.props.listId} itemId={id}/>
                    </div>
                </li>
            )
        });
    }
    render(){
        return(
            <ul className="collection">
                {this.renderItems()}
            </ul>
        )
    }
}

export default graphql(itemModifyQtyMutation)(ItemList);