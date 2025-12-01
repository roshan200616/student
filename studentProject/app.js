import express from "express";
import bodyParser from 'body-parser'
import methodOverride from "method-override";

//api
import studentApiRouter from './routes/api/studentRouter.js'
import staffApiRouter from './routes/api/staffRouter.js'
import departmentRouter from './routes/api/departmentRouter.js'
import adminRouter from './routes/api/adminRouter.js'
//ui
import studentUiRouter from './routes/ui/studentUiRouter.js'
import staffUiRouter from './routes/ui/staffUiRouter.js'
import adminUiRouter from './routes/ui/adminUiRouter.js'

const app = express()
app.use(bodyParser.json())
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

//home route
app.get('/home', async (req, res) => {
    res.render('pages/login.ejs')
})

// api routes 
app.use('/api/student/', studentApiRouter)
app.use('/api/staff/', staffApiRouter)
app.use('/api/department/', departmentRouter)
app.use('/api/admin/', adminRouter)
//ui routes
app.use('/student/', studentUiRouter)
app.use('/staff/', staffUiRouter)
app.use('/admin/', adminUiRouter)
try {
    app.listen(3000)
    console.log('server runnig http://localhost:3000')
}
catch (err) {
    console.log(err)
}