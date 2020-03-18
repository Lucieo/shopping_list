const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Item = mongoose.model('item');

const ItemType = new GraphQLObjectType({
  name:  'ItemType',
  fields: () => ({
    id: { type: GraphQLID },
    quantity: { type: GraphQLInt },
    content: { type: GraphQLString },
    list: {
      type: require('./list_type'),
      resolve(parentValue) {
        return Item.findById(parentValue).populate('list')
          .then(item => {
            console.log(item)
            return item.list
          });
      }
    }
  })
});

module.exports = ItemType;
