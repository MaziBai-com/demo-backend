const dotenv = require('dotenv'); 
dotenv.config()
module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_CLUSTER_URL: process.env.MONGO_CLUSTER_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGOOSE_OPTIONS: {
        useNewUrlParser:true 
    }
}