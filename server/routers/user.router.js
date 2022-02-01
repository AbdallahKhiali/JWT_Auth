const {login,createuser,getusers,logout} = require('../controllers/user.controller')
const checkToken = require('../jwt')
const express =require('express')
// const { validateToken } = require('../jwt')
const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(createuser)
router.route('/users').get(checkToken,getusers)
router.route('/logout').get(logout)

module.exports = router