const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })

    mongoose.connection.on('open', () => {
        console.log('mongoose conn ok');
    })
    mongoose.connection.on('err', err => {
        console.log(err)
    })
} 