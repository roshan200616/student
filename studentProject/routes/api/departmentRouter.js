import express from "express"
import { queryExec } from "../../serverConnection.js"
const router = express.Router()

router.get('/',async(req,res)=>{
    const data = await queryExec(`select * from department`)
    res.status(200).send(data)
})
export default router
