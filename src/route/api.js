import express from "express";
import APIController from '../controller/APIController';
let router = express.Router();

const initAPIRoute = (app) => {
    


    return app.use('/api/v1/', router)
}

export default initAPIRoute;