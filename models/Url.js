const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    orginal_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Urls', UrlSchema)