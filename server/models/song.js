let mongoose = require('mongoose')
let Schema = mongoose.Schema
let schemaName = 'Song'

let schema = new Schema({
  trackName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  collectionName: {
    type: String,
    required: true
  },
  previewUrl: {
    type: String,
    required: true
  },
  albumArt: {
    type: String,
    required: true
  },
  trackId: {
    type: Number,
    unique: true
  }
})

module.exports = mongoose.model(schemaName, schema)