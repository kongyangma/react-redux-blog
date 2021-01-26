// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
// const cors = require('cors');  // we don't need it anymore, because we use proxy server instead

// This is incomplete, since User, Password and dbname are not replaced with the real ones
// const db = 'mongodb+srv://User:Password@cluster0.01hrx.mongodb.net/<dbname>?retryWrites=true&w=majority';

// This is local database
const db = 'mongodb://localhost:27017/blog';

// This is to connect local database
mongoose
    .connect(db, { 
        useUnifiedTopology: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// DB Setup (connect mongoose and instance of mongodb)
// This is to connect remote mongodb database
// Listen to connection status
/*
mongoose
    .connect(db, { 
        useUnifiedTopology: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
*/


// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan('combined'));  // middleware for logging
app.use(bodyParser.json({ type: '*/*' }));  // middleware for helping parse incoming HTTP requests
// app.use(cors);  // middleware for circumventing (规避) cors error

// Router Setup
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);

