import gql from 'graphql-tag';

export default gql`
query FetchListDetails($id: ID!){
    list(id: $id){
        id
        title
        items {
            id
            content
            quantity
        }
    }
  }
`;