import express from "express"
import fetch  from "node-fetch"
const router = express.Router()
router.get('/details',async(req,res) =>{
    const response = await fetch('http://localhost:3000/staff')
    if(response.status === 200){
        const data = response.json()
        res.send(data)
    }
   else{
      res.send({data:[]})
   }
})