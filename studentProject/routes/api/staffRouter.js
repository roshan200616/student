import e from "express";
const router = e.Router()

router.get('/staff',(req,res)=>{
    res.render('pages/staff.ejs')
})
export default router