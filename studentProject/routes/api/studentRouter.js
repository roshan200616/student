import e from "express";
const router = e.Router()
import { queryExec } from "../../serverConnection.js";

router.get('/', async (req, res) => {
    try {
        const data = await queryExec(`select * from students`)
        if (data.length === 0) {
            res.status(404).send("NO found, mo data ")
        }
        else {
            res.status(200).send(data)
        }
    }
    catch (err) {
        res.status(500).send('server error : ' + err)
    }
})
router.get('/:student_id', async (req, res) => {
    try {
        const id = req.params.student_id
        const data = await queryExec(`select * from students where student_id = ?`, [id])
        if (data.length === 0) {
            res.status(404).send('not found')
        }
        else {
            res.status(200).send(data[0])
        }
    }
    catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }

})
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const values = [
            data.first_name,
            data.last_name,
            data.email,
            data.phone_number,
            data.date_of_birth,
            data.gender,
            data.department,
            data.admission_date,
            data.city
        ];

        if (
            data.first_name === '' ||
            data.last_name === '' ||
            data.email === '' ||
            data.phone_number === '' ||
            data.date_of_birth === '' ||
            data.gender === '' ||
            data.department === '' ||
            data.admission_date === '' ||
            data.city === ''
        ) {
            return res.status(400).json({message:'All fields are fill'})
        }
        const result = await queryExec(`INSERT INTO students 
            (first_name, last_name, email, phone_number, date_of_birth, gender, department, admission_date, city)
            VALUES
            (?,?,?,?,?,?,?,?,?)`, values)

        if (result.affectedRows === 0) {
            res.status(400).send('bad request')
        }
        else {
            res.status(201).send('insert successful')
        }
    }
    catch (err) {
        res.status(500).send(err)

    }
})
router.put('/:student_id', async (req, res) => {
    try {
        const id = req.params.student_id
        const data = req.body
        const keys = Object.keys(data)
        const values = Object.values(data)
        const set = keys.map(key => `${key} =?`).join(', ')
        const result = await queryExec(`update students set ${set} where student_id=? `, [...values, id])
        if (result.affectedRows === 0) {
            res.status(404).send('not found')
        }
        else {
            res.status(200).send("updated successful")

        }
    }
    catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }

})
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await queryExec('delete from students where student_id = ?', [id])
        if (result.affectedRows === 0) {
            res.status(404).json({message:'not found'})
        }
        else {
            res.status(200).send('delete successfully')
        }
    }
    catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }
})
export default router