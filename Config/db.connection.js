const mongoose = require('mongoose');
const connection  = mongoose.connect('mongodb://localhost:27017/LMS').then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

module.exports = connection;