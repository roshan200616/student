import express, { json, Router } from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/', async (req, res) => {
    const records = await queryExec(`select admin_id,username,email,role from admin`)
    res.status(200).send(records)
})
router.post('/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role
        } = req.body
        if (!username || !email || !password || !role) {
            return res.status(400).send(json({ msg: "all fields filled" }))
        }
        const result = await queryExec(`insert into admin(username,email,password,role)
        values(?,?,?,?)`, [username, email, password, role])
        if (result.affectedRows === 0) {
            res.status(400).send("bad request")
        }
        else {
            res.redirect('/admin/')
        }

    }
    catch (err) {
        console.error(err)
        res.send(' error occurrd')
    }

})

router.post('/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role
        } = req.body
        const result = await queryExec(`insert into admin(username,email,password,role)
        values(?,?,?,?)`, [username, email, password, role])
        if (username === '' || email === '' || password === '' || role === '') {
            return res.status(400).json({ msg: "all fields filled" })
        }
        if (result.affectedRows === 0) {
            res.status(400).send("bad request")
        }
        else {
            res.redirect('/admin/')
        }

    }
    catch (err) {
        console.error(err)
        res.send(' error occurrd')
    }

})
export default router
