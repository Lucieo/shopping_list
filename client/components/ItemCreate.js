import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import ItemCreateMutation from '../queries/itemCreateMutation';

class ItemCreate extends Component{
    constructor(props){
        super(props);
        this.state = {content: ''};
    }

    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables:{
                content: this.state.content,
                listId: this.props.listId
            }
        })
        this.setState({content: ''})
    }

    render(){
        return(
            <form onSubmit={(event)=>this.onSubmit(event)}>
                <label>Ajouter un article</label>
                <input 
                    onChange={event=>this.setState({content: event.target.value})}
                    value={this.state.content}
                />
            </form>
        )
    }
}

export default graphql(ItemCreateMutation)(ItemCreate);