const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
});
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
userSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('User', userSchema);