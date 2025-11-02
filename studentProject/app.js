import express from "express";
import bodyParser from 'body-parser'
//api
import studentApiRouter from './routes/api/studentRouter.js'
import staffApiRouter from './routes/api/staffRouter.js'

//ui
import studentUiRouter from './routes/ui/studentUiRouter.js'
import staffUiRouter from './routes/ui/staffUiRouter.js'
const app = express()
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))

//home route
app.get('/home', async (req,res) => {
    res.render('pages/index.ejs')
})

// api routes 
app.use('/api/student/', studentApiRouter)
app.use('/api/staff/',staffApiRouter)

//ui routes
app.use('/student/', studentUiRouter)
app.use('/staff/',staffUiRouter)
try{
    app.listen(3000)
    console.log('server runnig http://localhost:3000')
}
catch(err){
    console.log(err)
}