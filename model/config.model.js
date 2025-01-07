const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the configuration schema
const configSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
  },
  propertyId: {
    type: String,
    required: true,
  },
  propertyCode: {
    type: String,
    required: true,
  },

  appId: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
});

// Create the model
const Config = mongoose.model("Config", configSchema);

module.exports = Config;
