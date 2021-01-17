const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sum = (number1, number2) => {
    return number1+number2
}

const stopLossSchema = new Schema({
    price: Number,
    status: {
        type: String,
        enum: ['active', 'warning', 'danger', 'breached']
    },
    newHighPrice: Boolean
})

const testSchema = new Schema({
    test1: {
        type: Number,
        default: 1
    },
    test3: {
        type: Number,
        default: function() {
        return sum(this.test1, this.test2)
      }
    },
    test2: {
        type: Number
    }

})

const Test = mongoose.model('Test', testSchema);

module.exports = { stopLossSchema, Test, testSchema }