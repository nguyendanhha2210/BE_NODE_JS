const express = require('express')
import viewEngine from './config/viewEngine';
import connectDB from './config/connectDB';
import bodyParser from 'body-parser';
require('dotenv').config();
import initWebRoute from './route/web';
import cors from 'cors';
// import initAPIRoute from './route/api';

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: true }));

viewEngine(app);
initWebRoute(app);
// initAPIRoute(app);
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})