import express from 'express'
 import Userauthentication from '../../controller/User/userController.js'
const router=express.Router()

router.get('/api/',(req,res)=>{
    res.send('Hello from Login')
})
router.post('/api/login',Userauthentication.Login);
router.post('/api/signup',Userauthentication.SignUp)
router.get('/api/logout',Userauthentication.Logout);
// router.post('/api/forgotpassword',Forgotpassword);
// router.post('/api/updatepassword',UpdatePassword);


export default router