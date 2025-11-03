import express from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/', async (req, res) => {
    try {
        const data = await queryExec(`select 
            s.staff_id,
            s.staff_name,
            s.email,
            s.phone_number,
            s.hire_date,
            s.position,
            s.salary,
            d.department_name
            from staff  s 
             join department d ON s.department_id = d.department_id`)
        res.status(200).send(data)
    }
    catch (err) {
        console.error(err)
    }
})
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
router.delete('/:id',async (req,res) =>{
   try{ 
    const id = req.params.id
    const result = await queryExec(`delete from staff where staff_id = ?`,[id])
    if(result.affectedRows === 0){
        res.status(404).send('data not found')
    }
    else{
        res.status(200).send('deleted succefully')
    }
    }
    catch(err){
        res.status(500).send('server error')
        console.log(err)
    }
})
export default router