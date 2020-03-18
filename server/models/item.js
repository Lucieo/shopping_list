const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: 'list'
  },
  quantity: { type: Number, default: 1 },
  content: { type: String }
});

ItemSchema.statics.setQuantity = function(id, newQuantity) {
  return this.findById(id)
    .then(item => {
      item.quantity= newQuantity;
      return item.save();
    })
}


mongoose.model('item', ItemSchema);
