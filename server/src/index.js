const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const logs = require('./api/logs.js')

const mongoose = require('mongoose');


require('dotenv').config({path: "../.env"});

const middlewares = require('./middleware.js');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN 
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'hello world!',
    }); 
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () =>{
    console.log(`listening at http://localhost:${port}`);    
});
