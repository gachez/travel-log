const mongoose = require('mongoose');


const requiredString = {
    type: String,
    required: true
}

const logEntrySchema = new mongoose.Schema({
    title:  requiredString,
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90,
        required: true,
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180,
        required: true    
     },
    visitDate: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports = LogEntry;