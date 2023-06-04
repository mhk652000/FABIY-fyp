const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
    userID: String,
    image:String,
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsScehma);
