import express from "express"
import fetch  from "node-fetch"
const router = express.Router()
router.get('/', async(req, res) => {
    const response = await fetch(`http://localhost:3000/api/staff`)
    if(response.status === 200) {
        const data = await response.json()
        res.render('pages/staff.ejs', {data})
    }else {
        res.render('pages/staff.ejs', {data: []})
    }
})
router.get('/detail/:id',async (req,res) =>{
   try{ const{id} = req.params
     const response  = await fetch(`http://localhost:3000/api/staff/${id}`)
     if(response.status === 200){
        const data = await response.json()
        const pageName = 'detail'
        res.render('pages/staff.ejs',{data,pageName})

     }
     else{
        res.render('pages/staff.ejs',{data:[]})
     }
    }
    catch(err){
        console.log(error)
    }
})
export default router