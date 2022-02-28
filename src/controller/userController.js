import db from '../models/index';
import bcrypt from 'bcrypt'
import userService from '../services/userService';
import req from 'express/lib/request';

let handleLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Missing input parameter!",
            })
        }

        let userData = await userService.handleUserLogin(email, password);

        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    } catch (e) {
        console.log(e);
    }
}

let getAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required !",
            users: [],
        })
    }
    let users = await userService.getAll(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users: users,
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.editUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Not found id"
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let getAllCodes = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    getAllUsers: getAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCodes: getAllCodes,
}