import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/admin');

        if (response.status === 200) {
            const data = await response.json();
            res.render('pages/adminTable.ejs', { data });
        } else {
            res.render('pages/adminTable.ejs', { data: [] });
        }

    } catch (err) {
        console.log(err);
        res.render('pages/adminTable.ejs', { data: [] });
    }
});

export default router;
