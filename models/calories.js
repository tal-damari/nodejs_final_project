/*
Developers:
* Adar Azulay 208545285
* Tal Damari 208129643
* Shirel Oskar 318572401
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = ['breakfast','lunch', 'dinner', 'other'];

const CaloriesSchema = new Schema({
    user_id: {
        type:String
    },
    year: {
        type:Number
    },
    month: {
        type:Number
    },
    day: {
        type:Number
    },
    id: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String,
        enum: Categories
    },
    amount: {
        type: Number
    }
},{versionKey: false});

module.exports = mongoose.model('calories', CaloriesSchema);