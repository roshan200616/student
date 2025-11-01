import express from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/staff', async(req,res) =>{
    try{
        const result = await queryExec(`select * from staff`)
        res.send(result)
    }
    catch(err){
        console.error(err)
    }
})

export default router