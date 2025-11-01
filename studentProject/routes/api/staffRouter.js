import express from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/staff', async(req,res) =>{
    try{
        const result = await queryExec(` select distinct staff.staff_name , department.department_name
 from students 
 inner join 
 department on  students.department_id = department.department_id
 inner join 
 staff on staff.department_id = department.department_id;
`)
        res.send(result)
    }
    catch(err){
        console.error(err)
    }
})

export default router