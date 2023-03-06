const { mongoose, Schema } = require("mongoose");
const carouselSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Carousel", carouselSchema);
