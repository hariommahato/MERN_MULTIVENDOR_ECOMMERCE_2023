const {mongoose,Schema} = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter product name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "please Enter Description"],
  },
  price: {
    type: Number,
    required: [true, "please Enter Price"],
    maxLength: [8, "Price Cannot Exceed 8 character"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  userName:{
    type:String,
    required:true,
  },
  userPhone:{
    type:Number,
    required:true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter PRoduct Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [4, "Stock Cannot Exceed 4 Character"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
