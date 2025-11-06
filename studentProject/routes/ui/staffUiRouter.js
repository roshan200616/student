import express from "express"
import fetch from "node-fetch"
const router = express.Router()
router.get('/', async (req, res) => {
    const response = await fetch(`http://localhost:3000/api/staff`)
    if (response.status === 200) {
        const data = await response.json()
        res.render('pages/staff.ejs', { data })
    } else {
        res.render('pages/staff.ejs', { data: [] })
    }
})
router.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`http://localhost:3000/api/staff/${id}`)
        if (response.status === 200) {
            const data = await response.json()

            res.render('pages/staffCard.ejs', { data })
        }
        else {
            res.render('pages/staffCard.ejs', { data: [] })
        }
    }
    catch (err) {
        console.log(error.message)
    }
})
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response = await fetch(`http://localhost:3000/api/staff/${id}`)
        const pageName = 'edit'
        const data = await response.json()
        console.log(data)
        if (response.status === 200) {  
            res.render('pages/staffAdd.ejs', { data, pageName })
        }
        else {
            res.status(response.status).send('not fetch the value in staff ')
        }
    }
    catch (err) {
        console.log(err.message)
    }
})
router.get('/add', (req, res) => {
    const pageName = 'add'
    res.render('pages/staffAdd.ejs', {
        data: {}, pageName
    })

})

export default router