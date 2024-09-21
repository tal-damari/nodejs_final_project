/*
Developers:
* Adar Azulay 208545285
* Tal Damari 208129643
* Shirel Oskar 318572401
 */

const express = require('express');
const router = express.Router();

//our users
const members = [
    {
        'firstname': 'Adar',
        'lastname': 'Azulay',
        'id' : "208545285",
        'email': 'adar9800@gmail.com',
    },
    {
        'firstname': 'Tal',
        'lastname': 'Damari',
        'id' : "208129643",
        'email': 'taldamari643@gmail.com',
    },
    {
        'firstname': 'Shirel',
        'lastname': 'Oskar',
        'id' : "318572401",
        'email': 'shireloskar8@gmail.com',
    }
];

// http://localhost:3000/about/
router.get('/', function (req, res) {
    res.status(200).json(members)
});

module.exports = router;