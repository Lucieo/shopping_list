const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const mongoose = require('mongoose');
const List = mongoose.model('list');
const Item = mongoose.model('item');
const ListType = require('./list_type');
const ItemType = require('./item_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addList: {
      type: ListType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new List({ title })).save()
      }
    },
    addItemToList: {
      type: ListType,
      args: {
        content: { type: GraphQLString },
        listId: { type: GraphQLID }
      },
      resolve(parentValue, { content, listId }) {
        console.log('ADD ITEM TO LIST MUTATION')
        return List.addItem(listId, content);
      }
    },
    removeItem: {
      type: ListType,
      args: {
        itemId: { type: GraphQLID },
        listId: { type: GraphQLID }
      },
      resolve(parentValue, { itemId, listId }) {
        return List.removeItem(itemId, listId);
      }
    },
    modifyItemQuantity: {
      type: ItemType,
      args: { 
        id: { type: GraphQLID },
        quantity: {type: GraphQLInt},
        listId: { type: GraphQLID }
      },
      resolve(parentValue, { id, quantity, listId }) {
        return Item.setQuantity(id, quantity);
      }
    },
    deleteList: {
      type: ListType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return List.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
