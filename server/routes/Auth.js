const express= require('express');
const router = express.Router();

// Import routes
const { signUp, login } = require('../controllers/Auth');

router.post("/signup",signUp)
router.post("/loginUser",login)

module.exports = router;