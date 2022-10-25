const mongoose = require("mongoose");

const ArtDetailsSchema = new mongoose.Schema({
  metadataJSON: {
    // description, title, artistName, properties, fileURL, tokenId
    type: String,
    required: true,
  },
  userPublicAddress: {
    type: String,
    required: true,
  },
});

const ArtDetailsModel = mongoose.model("ArtDetails", ArtDetailsSchema);

module.exports = { ArtDetailsModel };
