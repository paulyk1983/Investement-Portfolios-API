const mongoose = require('mongoose')
const Schema = mongoose.Schema

const errorResponseSchema = new Schema({
    status: Number,
    title: String,
    details: String
})

errorResponseSchema.set('toJSON', {
    transform: function(doc, ret) {
       delete ret._id
       return ret
    }
 })

const ErrorResponse = mongoose.model('ErrorResponse', errorResponseSchema, 'errors')


module.exports = { ErrorResponse }