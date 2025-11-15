import express from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/', async (req, res) => {
    try {
        let page
        let limit
        let search
        let searchBy

        limit = req.query.limit || 5
        page = req.query.page || 1
        search = req.query.search || ""
        searchBy = req.query.searchby || "staff_name";

        const limitNo = Number(limit)
        const pageNo = Number(page)
        const offset = (pageNo - 1) * limitNo

        const response = {
            limit: 0,
            page: 0,
            totalRecords: 0,
            search:'',
            searchBy: 's.staff_name',
            data: [],

        }
        const result = await queryExec(`select * from  staff where ${searchBy} like '%${search}%' `)
        if (searchBy === 'gender' || searchBy === 'phone_number' || searchBy === 'salary') {
            console.log("roshan")
            const data = await queryExec(
                `
            select 
            s.staff_id,
            s.staff_name,
            s.email,
            s.phone_number,
            s.hire_date,
            s.position,
            s.salary,
            s.gender,
            d.department_name
            from staff  s 
            join department d ON s.department_id = d.department_id
            where s.${searchBy} = '${search}'
             limit ${limitNo} offset ${offset}`)
            if (data.length === 0) {
                res.status(404).send(response)
            }
            else {
                response.data = data;
                response.page = pageNo;
                response.limit = limitNo;
                response.search = search;
                response.searchBy = searchBy;
                response.totalRecords = result.length
                res.status(200).send(response);
            }
     
        }
        else {
            const data = await queryExec(
                `
            select 
            s.staff_id,
            s.staff_name,
            s.email,
            s.phone_number,
            s.hire_date,
            s.position,
            s.salary,
            s.gender,
            d.department_name
            from staff  s 
            join department d ON s.department_id = d.department_id
            where s.${searchBy} like '%${search}%'
             limit ${limitNo} offset ${offset}`

            )
            if (data.length === 0) {
                res.status(404).send(response)
            }
            else {
                response.data = data;
                response.page = pageNo;
                response.limit = limitNo
                response.totalRecords = result.length
                response.search = search;
                response.searchBy = searchBy;
                res.status(200).send(response);

            }

        }


    }
    catch (err) {
        console.error(err)
    }
})

router.get('/staff_id/:id', async (req, res) => {
    try {
        const staff_id = req.params.id;
        const data = await queryExec(`
      SELECT 
        s.staff_id,
        s.staff_name,
        s.email,
        s.phone_number,
        s.hire_date,
        s.position,
        s.gender,
        s.salary,
        d.department_name
      FROM staff s
      JOIN department d ON s.department_id = d.department_id
      WHERE s.staff_id = ?;
    `, [staff_id]);

        if (data.length === 0) {
            res.status(404).send('Staff not found');
        } else {
            res.status(200).send(data[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
router.get('/:id', async (req, res) => {
    try {

        const department_id = req.params.id
        const data = await queryExec(`SELECT 
                    s.staff_id,
                    s.staff_name,
                    s.email,
                    s.phone_number,
                    s.hire_date,
                    s.position,
                    s.gender,
                    s.salary,
                    d.department_name
                    FROM staff s
                    JOIN department d ON s.department_id = d.department_id
                    WHERE s.department_id = ?;
                    `, [department_id])
        if (data.length === 0) {
            res.status(404).send('not found')
        }
        else {
            res.status(200).send(data[0])
        }
    }
    catch (error) {
        console.log(error)
    }

})

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const values = [
            data.staff_name,
            data.email,
            data.phone_number,
            data.hire_date,
            data.position,
            data.gender,
            data.salary,
            data.department_id
        ]

        if (
            data.staff_name === '' ||
            data.email === '' ||
            data.phone_number === '' ||
            data.hire_date === '' ||
            data.position === '' ||
            data.gender === '' ||
            data.salary === '' ||
            data.department_id === ''
        ) {
            return res.status(400).json({ messare: 'All fileds are fill' })
        }
        const result = await queryExec(`insert into staff(
            staff_name,
            email,
            phone_number ,
            hire_date ,
            position ,
            gender,
            salary ,
            department_id ) 
            values(?,?,?,?,?,?,?,?)`, values)
        if (result.affectedRows === 0) {
            res.status(404).send("not found")
        }
        else {
            res.status(201).send("insert succefully")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }

})
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    const key = Object.keys(data)
    const values = Object.values(data)
    const set = key.map(key => `${key}=?`).join(',')
    const result = await queryExec(`update staff set ${set} where staff_id=? `, [...values, id])
    if (result.affectedRows === 0) {
        res.status(404).send('not found')
    }
    else {
        res.status(200).send('updated successful')
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await queryExec(`delete from staff where staff_id = ?`, [id])
        if (result.affectedRows === 0) {
            res.status(404).send('data not found')
        }
        else {
            res.status(200).send('deleted succefully')
        }
    }
    catch (err) {
        res.status(500).send('server error')
        console.log(err)
    }
})

export default router