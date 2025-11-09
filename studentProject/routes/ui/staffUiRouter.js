import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/staff');
    if (response.ok) {
      const data = await response.json();
      res.render('pages/staff.ejs', { data });
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

router.get('/add', (req, res) => {
  const pageName = 'add';
  res.render('pages/staffAdd.ejs', { data: {}, pageName });
});
router.get('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`http://localhost:3000/api/staff/staff_id/${id}`);
    const pageName = 'edit';
    if (response.ok) {
      const data = await response.json();
      res.render('pages/staffAdd.ejs', { data, pageName });
    } else {
      res.render('pages/staffAdd.ejs', { data: {}, pageName });
    }
  } catch (err) {
    console.error(err.message);
    res.render('pages/staffAdd.ejs', { data: {}, pageName: 'edit' });
  }
});


export default router;
