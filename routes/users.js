const express = require('express');
const router = express.Router();
const { createUser, updatePassword } = require('../controllers/usersController');

router.post('/register', createUser);
router.put('/update-password', updatePassword);

module.exports = router;
