import gql from 'graphql-tag';

export default gql`
mutation ModifyItemQuantity($id: ID, $quantity: Int, $listId: ID){
  modifyItemQuantity(id:$id, quantity:$quantity, listId: $listId){
      id
      quantity
    }
  }
`;