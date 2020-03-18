const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }]
});

ListSchema.statics.addItem = function(id, content) {
  const Item = mongoose.model('item');
  return this.findById(id)
    .then(list => {
      const item = new Item({ content, list });
      list.items = [...list.items, item]
      return Promise.all([item.save(), list.save()])
    })
    .then(([item, list]) => list);
}

ListSchema.statics.removeItem = function(itemId, listId) {
  console.log('REMOVE ITEMS CALLED', itemId)
  const Item = mongoose.model('item');
  return Item.remove({_id: itemId})
  .then(result=>{
      return this.findById(listId)
    }
  )
  .then(list=>{
    const filteredItems = list.items.filter(item=>item._id.toString()!==itemId)
    list.items = list.items.filter(item=>item._id!==itemId)
    list.items = filteredItems;
    return list.save()
  })
}

ListSchema.statics.findItems = function(id) {
  console.log('FIND ITEMS', id)
  return this.findById(id)
    .populate('items')
    .then(result => {
      console.log('FIND ITEMS', result)
      return result.items
    });
}

mongoose.model('list', ListSchema);