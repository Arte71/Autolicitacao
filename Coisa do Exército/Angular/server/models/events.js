const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    "idEvent": { type: Number, required: true, unique: true },
    "name": { type: String, required: true },
    "description": { type: String, required: true },
    "date": { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema, 'events');