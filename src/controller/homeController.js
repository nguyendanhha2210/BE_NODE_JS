import { reject } from 'bcrypt/promises';
import res from 'express/lib/response';
import db from '../models/index';
import CrudService from '../services/CrudService';

let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            dataUser: data
        });
    } catch (e) {
        console.log(e);
    }
}

let getCrud = async (req, res) => {
    return res.render('crud.ejs');
}

let postCrud = async (req, res) => {
    let message = await CrudService.createNewUser(req.body);
    return res.render(message);
}

let displayCrud = async (req, res) => {
    let data = await CrudService.getAllUser();
    return res.render('displayCrud.ejs', { dataTable: data });
}

let editCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let data = await CrudService.editCrud(userId);
        return res.render('editCrud.ejs', { dataTable: data })
    } else {
        return res.send("Not found user id")
    }
}

let putCrud = async (req, res) => {
    let data = await CrudService.putCrud(req.body);
    return res.render('displayCrud.ejs', { dataTable: data });
}
let deleteCrud = async (req, res) => {
    let data = await CrudService.deleteCrud(req.body);
    return res.render('displayCrud.ejs', { dataTable: data });
}

module.exports = {
    getHomepage, getCrud, postCrud, displayCrud, editCrud, putCrud, deleteCrud
}