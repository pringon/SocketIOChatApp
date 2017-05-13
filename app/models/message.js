const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

messageSchema = Schema({

  text:    String,
  sentAt:  { type: Date, default: Date.now },
  //_chat  : { type: Schema.Types.ObjectId, ref: 'Chat' },
  user:    String
})

messageSchema.index({ sentAt: -1 })

module.exports = mongoose.model('Message', messageSchema)
