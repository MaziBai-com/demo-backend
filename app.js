// INTIALISING EXPRESS 
const express = require('express')
const app = express(); 

// MIDDLEWARES 
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv');
dotenv.config(); 

// ROUTES 
const UserAuthRoutes = require('./routes/Auth/UserAuth');
const MaidAuthRoutes = require('./routes/Auth/MaidAuth');
const ReviewRoutes = require('./routes/Reviews/Review');
const BookingRoutes = require('./routes/Bookings/Bookings'); 
const NotificationRoutes = require('./routes/Notifications/Notifications'); 
app.use('/api/auth/user',UserAuthRoutes)
app.use('/api/auth/maid',MaidAuthRoutes)
app.use('/api/reviews',ReviewRoutes)
app.use('/api/bookings',BookingRoutes); 
app.use('/api/auth/admin',require('./routes/AdminAuth/AdminAuth')); 
app.use('/api/notifications',NotificationRoutes); 

// login user details 
app.use('/api/user/',require('./routes/loginUser/LoginUser'))


// To Upload Image 
app.use('/api/upload',require('./routes/Upload'))
// static images response 
app.use('/uploads',express.static('uploads'))


app.get('/',(req,res)=>{
    res.send('Hello I am Uday')
})


module.exports = app;