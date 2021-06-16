const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');

//All Routes  for admin / Recruiter / Client
const authenticationRoute = require('./routes/authentication')
const adminRoutes = require('./routes/admin/adminRecruiter')
const clientRoutes = require('./routes/admin/adminClient')
const recruiterProfileRoutes = require('./routes/recruiter/recruiter')
const clientProfileRoute = require('./routes/client/client')
const clientPost = require('./routes/client/post')

//including dotenv module
require('dotenv').config()

const app = express();

//connecting to MongoDB Database
mongoose.connect(process.env.DATABASECONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('DB CONNECTED SUCCESSFULLY')
    })
    .catch(() => {
        console.log("DB connection failed")
    })

// Adding the middleware modules
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Middleware domain routes
app.use('/portal', authenticationRoute);
app.use('/portal', adminRoutes);
app.use('/portal', clientRoutes);
app.use('/portal', recruiterProfileRoutes);
app.use('/portal', clientProfileRoute);
app.use('/portal', clientPost);



//Listening the PORT
app.listen(process.env.PORT, (error, resp) => {
    if (error) {
        console.log("Error occured at 4000 PORT")
    }
    else {
        console.log(`App is running ${process.env.PORT} number`);
    }
})
