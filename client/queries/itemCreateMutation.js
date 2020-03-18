import gql from 'graphql-tag';

export default gql`
mutation AddItemToList($content: String, $listId: ID!){
    addItemToList(content:$content, listId: $listId){
        id
        items{
            id
            content
            quantity
        }
    }}
`;