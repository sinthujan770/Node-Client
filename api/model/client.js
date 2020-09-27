const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
  
    name: { type: String, required: true},
    balance: { type: Number, required: true},
    ID: { type: String, required: true},
    Email: { type: String, required: true},
});
module.exports = mongoose.model('Client',clientSchema);