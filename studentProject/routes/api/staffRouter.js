import express from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/', async(req,res) =>{
    try{
        const data = await queryExec(`select * from staff`)
        res.status(200).send(data)
    }
    catch(err){
        console.error(err)
    }
})
router.get('/:id' ,async(req,res) =>{
       try{

        const department_id = req.params.id
        const data = await queryExec(`select * from staff where department_id = ? `,[department_id])
        if(data.length === 0){
            res.status(404).send('not found')
        }
        else{
            res.status(200).send(data)
         }
    }
    catch(error){
        console.log(error)
    }
    
})
export default router