import gql from 'graphql-tag';

export default gql `
    mutation DeleteItem($itemId: ID, $listId: ID){
        removeItem(itemId: $itemId, listId: $listId){
            id 
        }
    }
`;