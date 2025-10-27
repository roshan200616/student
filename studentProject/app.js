import e from "express";
import bodyParser from 'body-parser'
import studentApiRouter from './routes/studentRouter.js'
import staffApiRouter from './routes/staffRouter.js'
const app = e()
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.get('/home', async (req,res) => {
    res.render('pages/index.ejs')
})

app.use('/', studentApiRouter)
app.use('/',staffApiRouter)

try{
    app.listen(3000)
    console.log('server runnig http://localhost:3000')
}
catch(err){
    console.log(err)
}