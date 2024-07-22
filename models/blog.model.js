import mongoose, { Schema } from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  coverimageurl:{
    type:String,
    required:false,
  },
  createdby: {
    type: Schema.Types.ObjectId,
    ref: "user",
   
  },

},{timestamps:true});

export const {Blog} = mongoose.model('Blog', BlogSchema);
