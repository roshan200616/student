import e from "express";
const router = e.Router()
import { queryExec } from "../serverConnection.js";
router.get('/students', async (req, res) => {
    try {
        const data = await queryExec(`select * from students`)
        if (data.length === 0) {
            res.status(404).send("NO found, mo data ")
            res.render('pages/index.ejs')
        }

        else {
            res.render('pages/student.ejs', { data })
        }
    }
    catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }
})
router.get('/student/add',async (req,res)=>{
    
    res.render('pages/add.ejs')
})
router.get('/student/:student_id', async (req, res) => {
    try {
        const id = req.params.student_id
        const data = await queryExec(`select * from students where student_id = ?`, [id])
        console.log()
        if (data.length === 0) {
            res.status(404).send('not found')
        }
        else {
            res.render('pages/student.ejs', { data })
        }
    }
    catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }

})
router.post('/student', async (req, res) => {
    try {
        const data = req.body;
const values = [
  data.first_name ?? null,
  data.last_name ?? null,
  data.email ?? null,
  data.phone_number ?? null,
  data.date_of_birth ?? null,
  data.gender ?? null,
  data.department ?? null,
  data.admission_date ?? null,
  data.city ?? null
];

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
        res.status(500).send('server error',err)
        
    }
})
router.put('/:student_id', async (req, res) => {
    try {
        const id = req.params.student_id
        const data = req.body
        const keys = Object.keys(data)
        const values = Object.values(data)
        const set = keys.map(key => `${key} =?`).join(', ')
        console.log(...values)
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
            res.status(404).send('not found')
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