import gql from 'graphql-tag';

export default gql`
    mutation AddList($title: String){
        addList(title:$title){
            title
        }
    }
`;