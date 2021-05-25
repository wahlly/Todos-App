require('dotenv').config()
const mongoose = require('mongoose')


module.exports = async() => {
   
    await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`mongodb is connected successfully`)
    })
    .catch((err) => {
        console.error(err)
    });

}