import pool from '../config/connectDB';

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('insert into users(firstName, lastName, email) values (?, ?, ?)',
        [firstName, lastName, email]);
    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, id } = req.body;
    if (!firstName || !lastName || !email || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('update users set firstName= ?, lastName = ? , email = ? where id = ?',
        [firstName, lastName, email, id]);
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from users where id = ?', [userId])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}