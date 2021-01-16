require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');


const routes = require('./routes')


// Connecting to MongoDB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, },
    () => {
        console.log('connected to DB')
    })


// Middleware 
app.use(fileUpload())
app.use(express.json());
app.use(cors());



app.use('/api', routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build/')));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening`);
});

