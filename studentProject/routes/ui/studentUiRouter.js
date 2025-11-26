import express from "express";
import fetch from "node-fetch";

const router = express.Router()

router.get('/', async (req, res) => {
  let page
  let limit
  let search
  let searchby
  if (req.query.limit === undefined) {
    limit = 5
  } else {
    limit = req.query.limit
  }
  if (req.query.page === undefined) {
    page = 1
  } else {
    page = req.query.page
  }
  if (req.query.search === undefined) {
    search = ''
  }
  else {
    search = req.query.search
  }
  if(req.query.searchby === undefined){
    searchby=''
  }
  else{
    searchby= req.query.searchby
  }
  const response = await fetch(`http://localhost:3000/api/student?limit=${limit}&page=${page}&search=${search}&searchby=${searchby}`)
  if (response.status === 200) {
    const studentRes = await response.json()
    const data = studentRes.data
    const records = studentRes.totalRecords
    const pageCount = Math.ceil(records / limit);
    const currentPage = studentRes.page
    const limitno = studentRes.limit
    res.render('pages/student.ejs', { data, pageCount, currentPage, records, limitno })
  } else {
    const studentRes = await response.json()
    const records = studentRes.totalRecords
    const pageCount = Math.ceil(records / limit);
    const currentPage = studentRes.page
    const limitno = studentRes.limit
    res.render('pages/student.ejs', { data: [], pageCount, currentPage, records, limitno })
  }
})

router.get('/add', async (req, res) => {
  const pageName = 'add'
  const departmentResponse = await fetch(`http://localhost:3000/api/department`);
  if (departmentResponse.status === 200) {
    const departmentRes = await departmentResponse.json()
    res.render('pages/add.ejs', { data: {}, pageName, departmentRes })
  }
  else {
    res.render('pages/add.ejs', { data: {}, pageName, departmentRes: [] })
  }
})

router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`http://localhost:3000/api/student/${id}`);
    const departmentResponse = await fetch(`http://localhost:3000/api/department`);
    if (response.status === 200 && departmentResponse.status === 200) {
      const data = await response.json();
      const departmentRes = await departmentResponse.json()
      const pageName = 'edit'
      res.render('pages/add.ejs', { data, pageName, departmentRes });
    } else {
      res.status(response.status).send("Failed to fetch student data");
    }
  } catch (err) {
    console.error(err);
  }
});


export default router