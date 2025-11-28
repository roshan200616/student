import express, { Router } from "express";
import { queryExec } from "../../serverConnection.js";
const router = express.Router()
router.get('/',async(req,res)=>{
    const records = await queryExec(`select admin_id,username,email,role from admin`)
    res.status(200).send(records)
})
export default router
