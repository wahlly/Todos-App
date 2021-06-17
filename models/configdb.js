require('dotenv').config()
const mongoose = require('mongoose')


module.exports = async() => {
   try{
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`mongodb is connected successfully`)
    }
    catch(err) {
        console.error(err)
    }

}