import express from "express";
import homeController from '../controller/homeController';
import userController from '../controller/userController';
import doctorController from '../controller/doctorController';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCrud);
    
    router.get('/get-crud', homeController.displayCrud);
    router.get('/edit-crud', homeController.editCrud);
    router.post('/put-crud', homeController.putCrud);
    router.post('/delete-crud', homeController.deleteCrud);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/all-codes', userController.getAllCodes);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);

    return app.use('/', router)
}
module.exports = initWebRoute;