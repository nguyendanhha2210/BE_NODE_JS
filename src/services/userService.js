import bcrypt from 'bcrypt'
var salt = bcrypt.genSaltSync(10);
import db from '../models/index';
import { reject } from "bcrypt/promises";
import { raw } from 'body-parser';
import { resolve } from 'app-root-path';

let getAll = async (userId) => {
    return new Promise((resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                });

                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Password không tồn tại !`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User không tồn tại !';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Email không tồn tại !';
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
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

let createUser = (data) => {
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
                positionId: data.positionId,
                image: data.avatar,
            });
            resolve({
                errCode: 0,
                errMessage: 'Add success !'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Vào BE');
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (!user) {
                resolve({
                    errCode: 1,
                    errMessage: 'Not found user !'
                })
            }
            await db.User.destroy({
                where: { id: userId }
            });
            resolve({
                errCode: 0,
                errMessage: 'Delete success !'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters !",
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,
                    user.roleId = data.roleId,
                    user.positionId = data.positionId,
                    user.gender = data.gender,
                    user.email = data.email,
                    user.phoneNumber = data.phoneNumber,
                    user.image = data.avatar

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Edit success !'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found !'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !',
                });
            } else {
                let res = {};
                let allCodes = await db.All_Code.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allCodes
                resolve(res);
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAll: getAll,
    hashUserPassword: hashUserPassword,
    createUser: createUser,
    deleteUser: deleteUser,
    editUser: editUser,
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllCodeService: getAllCodeService
}