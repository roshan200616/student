import express from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/', async (req, res) => {
    const records = await queryExec(`select admin_id,username,email,role from admin`)
    res.status(200).send(records)
})
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const record = await queryExec(`select admin_id,username,email,role,password from admin where admin_id = ?`, [id])
        res.status(200).send(record[0])
    }
    catch (err) {
        console.log(err)
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
router.put('/edit/:id', async(req, res) => {
    try{
    const id = req.params.id
    const data=req.body
    delete data._method
    const keys = Object.keys(data)
    const values = Object.values(data)
    const set = keys.map(key =>`${key}=?`).join(',')
    const result = await queryExec(`update  admin set ${set} where admin_id=? `,[...values,id])
    if(result.affectedRows === 0){
        res.status(404).send('Bad request')
    }
    else{
        res.redirect('/admin/')
    }
    }
catch(err){
   console.log(err)
} 
})
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await queryExec('delete from admin where admin_id=?', [id])
        if (result.affectedRows === 0) {
            res.status(404).send("not found")
        }
        else {
            res.status(200).send("successfull")
        }
    }
    catch (err) {
        console.log(err)
        res.send("an error occurrd")
    }

})
export default router
