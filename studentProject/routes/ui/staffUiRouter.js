import express, { json } from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let page
    let limit 
    if(req.query.limit === undefined) {
        limit = 5
    }else {
        limit = req.query.limit
    }
    if(req.query.page === undefined) {
        page = 1
    }else {
        page = req.query.page
    }
    const response = await fetch(`http://localhost:3000/api/staff?page=${page}`);
    if (response.status===200) {
      const staffRes = await response.json();
      const records = staffRes.totalRecords
      const pageCount = Math.ceil(records / limit);
     const   currentPage=staffRes.page
      res.render('pages/staff.ejs', { data: staffRes.data , pageCount, currentPage});
    } else {
      res.render('pages/staff.ejs', { data: [] });
    }
  } catch (err) {
    console.error('Error fetching staff:', err.message);
    res.render('pages/staff.ejs', { data: [] });
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`http://localhost:3000/api/staff/${id}`);
    if (response.ok) {
      const data = await response.json();
      res.render('pages/staffCard.ejs', { data });
    } else {
      res.render('pages/staffCard.ejs', { data: [] });
    }
  } catch (err) {
    console.error(err.message);
    res.render('pages/staffCard.ejs', { data: [] });
  }
});
router.get('/add',async (req, res) => {
    const pageName = 'add'
    const departmentResponse = await fetch(`http://localhost:3000/api/department`);
    if(departmentResponse.status === 200){
      const departmentRes = await departmentResponse.json()
    res.render('pages/staffAdd.ejs',{data: {}, pageName,departmentRes})
     }
     else{
       res.render('pages/staffAdd.ejs',{data:{},pageName,departmentRes:[]})
     }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`http://localhost:3000/api/staff/staff_id/${id}`);
    const departmentResponse = await fetch(`http://localhost:3000/api/department`);
    const pageName = 'edit';
    if (response.status === 200 && departmentResponse.status === 200) {
      const data = await response.json();
      const departmentRes = await departmentResponse.json()

      res.render('pages/staffAdd.ejs', { data, pageName, departmentRes });
    } else {
      res.render('pages/staffAdd.ejs', { data: {}, pageName, departmentRes: [] });
    }
  } catch (err) {
    console.error(err.message);
    res.render('pages/staffAdd.ejs', { data: {}, pageName: 'edit' });
  }
});


export default router;
