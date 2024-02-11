const mongoose    = require('mongoose')
require("dotenv").config();
// const url = 'mongodb://localhost:27017/newdata'
const url = process.env.MONGO_URL

mongoose.connect(url , 
  {
    useNewUrlParser: true,
     useUnifiedTopology: true
  
    }).then(con =>{
  
   if (con){
    console.log('Succed MongoDB Atlas Connected ')
   }
   else {
    console.log("Error to connect to MongoDB")
   }
    
    })


