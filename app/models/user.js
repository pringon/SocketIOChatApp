const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      bcrypt   = require('bcrypt-nodejs')

userSchema = Schema({

  name     : String,
  email    : String,
  password : String,
  //chats    : [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
})

userSchema.index({ name : 1 }, { email: 1 })

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
