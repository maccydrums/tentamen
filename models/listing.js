mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  listing: {
    kommun: String,
    gata: String,
    bostadstyp: String,
    pris: String,
    månadskostnad: String,
    budning: Boolean,
    kordinater: {
      lat: Number,
      long: Number,
    }
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;