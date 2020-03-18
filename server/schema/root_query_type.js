const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ListType = require('./list_type');
const ItemType = require('./item_type');
const Item = mongoose.model('item');
const List = mongoose.model('list');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    lists: {
      type: new GraphQLList(ListType),
      resolve() {
        return List.find({});
      }
    },
    list: {
      type: ListType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return List.findById(id);
      }
    },
    item: {
      type: ItemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnentValue, { id }) {
        return Item.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
