const moment = require('moment')

const formatDate = (date) => {
    return moment(date.setDate(date.getDate() + 1)).format('YYYY-MM-DD')
}

module.exports = { formatDate }