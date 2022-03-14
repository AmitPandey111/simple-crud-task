var express = require('express');
const user= require('../controllers/User')
const UserDetails= require('../controllers/User')
const UserUpdateDetails= require('../controllers/User')
const UserDeleteDetails= require('../controllers/User')
const {customValdn}=require('../middlewares/customValdn')
const {authValdn}=require('../middlewares/authValdn')

const UserSignUp= require('../controllers/User')
const UserLogin= require('../controllers/User')
var router = express.Router();
// Simple CRUD API
router.post('/createdetails', user.saveUser);
router.get('/getdetails/:id', UserDetails.getUserById);
router.put('/updatedetails/:id', UserUpdateDetails.updateUserById);
router.delete('/deletedetails/:id',UserDeleteDetails.deleteUserById);
// Login API 
router.post('/signup', customValdn,UserSignUp.signUp);
router.post('/login', customValdn,authValdn,UserLogin.login);
module.exports = router;