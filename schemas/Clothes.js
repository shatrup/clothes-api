const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ClothesSchema = new Schema({
  title:{
    type: String,
    required : true
  },
  clotheType:{
    type:String,
    required : true
  },
  size:{
    type: String,
    required : true
  },
  color:{
    type: String,
    required : true
  },
  createdBy:{
    type: String,
    required : true
  },
  sharedTo:[{
    type: String,
      }],
  image:{
    type: String,
    default: 'placeholder.png'
  },
  count: {
    type: String
  }
});

module.exports = Clothes = mongoose.model('clothes', ClothesSchema);