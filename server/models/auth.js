const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  OAuth2Client: {
    _events: mongoose.Schema.Types.Mixed,
    _eventsCount: Number,
    _maxListeners: mongoose.Schema.Types.Mixed,
    transporter: mongoose.Schema.Types.Mixed,
    credentials: {
      access_token: String,
      scope: String,
      token_type: String,
      expiry_date: Number,
      refresh_token: String
    },
    certificateCache: mongoose.Schema.Types.Mixed,
    certificateExpiry: mongoose.Schema.Types.Mixed,
    certificateCacheFormat: String,
    refreshTokenPromises: mongoose.Schema.Types.Mixed,
    _clientId: String,
    _clientSecret: String,
    redirectUri: String,
    eagerRefreshThresholdMillis: Number
  }
});

// compile model from schema
module.exports = mongoose.model("auth", AuthSchema);