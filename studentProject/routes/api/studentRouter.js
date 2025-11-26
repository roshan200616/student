import e from "express";
const router = e.Router()
import { queryExec } from "../../serverConnection.js";

router.get('/', async (req, res) => {
    try {
        let page
        let limit
        let search
        let searchby
        if (req.query.limit === undefined) {
            limit = 5
        } else {
            limit = req.query.limit
        }
        if (req.query.page === undefined) {
            page = 1
        } else {
            page = req.query.page
        }
        search = req.query.search || ''
        searchby = req.query.searchby || 'first_name'

        const limitNo = Number(limit)
        const pageNo = Number(page)
        const offset = (pageNo - 1) * limitNo

        const response = {
            limit: 0,
            page: 0,
            totalRecords: 0,
            data: [],
            search:'',
            searchby:'s.first_name'

        }
        if (searchby === 'phone_number'|| searchby === 'gender') {
            const result = await queryExec(`select * from students where ${searchby} = '${search}'`)

            const data = await queryExec(`
      SELECT 
        s.student_id,
        s.first_name,
        s.last_name,
        s.email,
        s.phone_number,
        s.gender,
        s.date_of_birth,
        s.admission_date,
        s.city,
        d.department_name,
        d.department_id,
        st.staff_name
      FROM students s
      left JOIN department d ON s.department_id = d.department_id
      left JOIN staff st ON s.department_id = st.department_id
      where s.${searchby} = '${search}'
      limit ${limitNo} offset ${offset}
    `);
            response.data = data
            response.limit = limitNo
            response.page = pageNo
            response.totalRecords = result.length
            response.search =search
            response.searchby = searchby
                res.status(200).send(response);
            
        }
        else {
            const result = await queryExec(`select * from students where ${searchby} like '%${search}%'`)

            const data = await queryExec(`
      SELECT 
        s.student_id,
        s.first_name,
        s.last_name,
        s.email,
        s.phone_number,
        s.gender,
        s.date_of_birth,
        s.admission_date,
        s.city,
        d.department_name,
        d.department_id,
        st.staff_name
      FROM students s
      left JOIN department d ON s.department_id = d.department_id
      left JOIN staff st ON s.department_id = st.department_id
      where s.${searchby} like '%${search}%'
      limit ${limitNo} offset ${offset}
    `);
            response.data = data
            response.limit = limitNo
            response.page = pageNo
            response.totalRecords = result.length
            response.search = search
            response.searchby = searchby
            
                res.status(200).send(response);

        }

    }
    catch (err) {
        res.status(500).send('Server error: ' + err);
    }
});

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
            data.department_id,
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
            data.department_id === '' ||
            data.admission_date === '' ||
            data.city === ''
        ) {
            return res.status(400).json({ message: 'All fields are fill' })
        }
        const result = await queryExec(`INSERT INTO students 
            (first_name, last_name, email, phone_number, date_of_birth, gender, department,department_id, admission_date, city)
            VALUES
            (?,?,?,?,?,?,?,?,?,?)`, values)

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
            res.status(404).json({ message: 'not found' })
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
            res.status(404).json({ message: 'not found' })
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