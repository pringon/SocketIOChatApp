const mongoose = require('mongoose'),
      Schema   = mongoose.Schema

chatSchema = Schema({

  //users    : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  users    : [{ type: String }],
  messages : [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})


module.exports = mongoose.model('Chat', chatSchema)
