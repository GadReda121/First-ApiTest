require('dotenv').config();
const express = require('express');
const httpStatusText = require('./utils/httpStatusText');
const cors = require('cors');

const app = express();

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

const mongoose = require('mongoose');

const url = process.env.MONGOBD_URL;
  
mongoose.connect(url).then(() => {
    console.log(`Mongodb Connect Success!`);
})
.catch((error) => {
    console.log(`Mongodb Connect Failed!`);
    console.log(error);
});


app.use(cors());
app.use(express.json());

const coursesRouter = require('./routes/courses-route');
const usersRouter = require("./routes/users_route"); 

app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// Global Route Handler
app.all('*', (req, res) => {
    res.status(404).json({
        status: httpStatusText.FAIL,
        msg: `Can't find ${req.originalUrl} on this server!`
    });
}); 

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.statusText || httpStatusText.ERROR,
        msg: err.message,
    });
});

app.listen(process.env.PORT);