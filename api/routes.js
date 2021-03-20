const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.hello);


// write your routes
router.get('/users', controllers.getUsers);
router.post('/users', controllers.signUp);

module.exports = router;
