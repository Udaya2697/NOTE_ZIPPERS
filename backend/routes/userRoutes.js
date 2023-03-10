const express=require('express')
const userRoutes= require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')
const router=express.Router()

 router.post('/post', userRoutes.registerUser);
 router.post('/login',userRoutes.authUser);
 router.post("/sendmail",userRoutes.Sendmail);
 router.post('/profile',protect,userRoutes.updateUserProfile)
// git 

 module.exports=router;