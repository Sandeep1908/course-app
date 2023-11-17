import 'dotenv/config'
import Express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoute from './routes/user/user.js'
import supabase from './utlis/supabase.js';
import verifyToken from './middleware/protectedRoutes.js';
import courseRouter from './routes/course/course.js'
const app=Express()

app.use(cors())
app.use(Express.urlencoded({extended:true}))
app.use(Express.json()) 
app.use(cookieParser()) 
app.use('/user',userRoute)
app.use('/course',courseRouter)

app.get('/getuser',verifyToken, async(req,res)=>{
    res.json( await supabase.auth.getUser())
})
 
 

const PORT=process.env.PORT || 3000

app.listen(PORT,(req,res)=>{
    console.log(`server is listning at ${PORT}`);
})