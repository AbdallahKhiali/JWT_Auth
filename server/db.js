const mongoose = require('mongoose')

const Connection = async ()=>{
    mongoose.connect('mongodb://localhost:27017/mern_one')    
        .then(() => {
            console.log('Successfully connected to MongoDB Atlas!');
        })
        .catch((error) => {
            console.log('Unable to connect to MongoDB Atlas!');
            console.error(error);
        });

} 


module.exports = Connection