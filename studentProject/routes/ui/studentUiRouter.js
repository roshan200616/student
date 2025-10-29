import express from "express";
import fetch from "node-fetch";

const router = express.Router()

router.get('/', async(req, res) => {
    const response = await fetch(`http://localhost:3000/api/student`)
    if(response.status === 200) {
        const data = await response.json()
        res.render('pages/student.ejs', {data})
    }else {
        res.render('pages/student.ejs', {data: []})
    }
})

router.get('/add', (req, res) => {
    const pageName = 'add'
    res.render('pages/add.ejs',{data: {}, pageName})
})

router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`http://localhost:3000/api/student/${id}`);

    if (response.status === 200) {
      const data = await response.json();
      const pageName = 'edit'
      res.render('pages/add.ejs', { data, pageName });  
    } else {
      res.status(response.status).send("Failed to fetch student data");
    }
  } catch (err) {
    console.error(err);
  }
});


export default router