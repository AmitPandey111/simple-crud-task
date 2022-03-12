var express = require('express');
const user= require('../controllers/User')
const UserDetails= require('../controllers/User')
const UserUpdateDetails= require('../controllers/User')
const UserDeleteDetails= require('../controllers/User')
var router = express.Router();

router.post('/createdetails', user.saveUser);
router.get('/getdetails/:id', UserDetails.getUserById);
router.put('/updatedetails/:id', UserUpdateDetails.updateUserById);
router.delete('/deletedetails/:id', UserDeleteDetails.deleteUserById);
module.exports = router;