/*
Developers:
* Adar Azulay 208545285
* Tal Damari 208129643
* Shirel Oskar 318572401
 */

const express = require('express');
const Calories = require('../models/calories');
const router = express.Router();

/* GET report page. */
// http://localhost:3000/report/?user_id=enter_id&year=enter_year&month=enter_month
router.get('/', async function (req, res, next) {
    const user_id = req.query.user_id;
    const year = req.query.year;
    const month = req.query.month;

    if (!user_id || !year || !month) {
        // Render a default page or return a JSON response explaining the expected details
        return res.status(400)
            .json({ error:
                    'Please provide user_id, year, and month parameters.'
            });
    }

    try {
        const categories = Calories.schema.path('category').enumValues;
        const report = {};

        // Initialize the report with all categories
        categories.forEach(category => {
            report[category] = [];
        });

        // Getting all the user's calories with the inputted year and month
        const calorieEntries = await Calories.find({ user_id, year, month });
        console.log(calorieEntries);
        calorieEntries.forEach(entry => {
            report[entry.category].push({
                day: entry.day,
                description: entry.description,
                amount: entry.amount
            });
        });

        res.json(report);
    } catch (err) {
        console.error("Error generating report: ", err);
        next(err);
    }
});

module.exports = router;
