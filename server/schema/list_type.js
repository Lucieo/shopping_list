const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const ItemType = require('./item_type');
const List = mongoose.model('list');

const ListType = new GraphQLObjectType({
  name:  'ListType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parentValue) {
        console.log("-------------------")
        console.log(parentValue)
        return List.findItems(parentValue.id);
      }
    }
  })
});

module.exports = ListType;
