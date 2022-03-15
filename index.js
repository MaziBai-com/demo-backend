
const mongoose = require('mongoose'); 
const app = require('./app')

// importing 
const config = require('./config'); 

mongoose.connect(config.MONGO_URL,config.MONGOOSE_OPTIONS)
.then(()=>{
    app.listen( config.PORT, ()=> {
        console.log('Server Started : ',config.PORT); 
    })
})
.catch((err)=> {
    console.log(err.message);
})
