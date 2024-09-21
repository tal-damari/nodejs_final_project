/*
Developers:
* Adar Azulay 208545285
* Tal Damari 208129643
* Shirel Oskar 318572401
 */

const express = require('express');
const router = express.Router();
const Calories = require('../models/calories');

// POST route to add new calorie entry
// http://localhost:3000/addcalories/
router.post('/', function (req, res, next) {
    console.log('Request Body:', req.body);
    console.log(req.body.category);
    const { user_id, year, month, day,
        description, category, amount } = req.body;

    //new const var with the user parameters to add
    const newCalories = new Calories({
        user_id,
        year,
        month,
        day,
        description,
        category,
        amount
    });

    // Saving the new calories in the Database
    newCalories.save()
        .then(function (ob) {
            console.log("Calories item created");
            res.send("Calories item saved successfully");
        })
        .catch(err => {
            console.error("Error saving calories:", err);
            next(err);
        });
});

// GET route to serve the HTML form using Pug
// http://localhost:3000/addcalories/
router.get('/', function (req, res) {
    console.log("Rendering addcalories form...");
    // Render the addcalories.pug file
    res.render('addcalories');
});

module.exports = router;