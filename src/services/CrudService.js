import bcrypt from 'bcrypt'
var salt = bcrypt.genSaltSync(10);
import db from '../models/index';
import { reject } from "bcrypt/promises";

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
            });
            resolve('Add success !')
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll();
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let editCrud = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    })
}

let putCrud = async (data) => {
    console.log(data.id);
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address
                await user.save();

                let users = db.User.findAll();
                resolve(users);
            } else {
                resolve('Update False !')
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteCrud = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.userId },
            });
            if (user) {
                await user.destroy();

                let users = db.User.findAll();
                resolve(users);
            } else {
                resolve()  //~back lại
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser, hashUserPassword, getAllUser, editCrud, putCrud, deleteCrud
}