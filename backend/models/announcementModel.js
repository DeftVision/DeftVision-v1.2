const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    audience: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: false,
    }
}, {timestamps: true});

const announcementModel = mongoose.model("announcement", announcementSchema);
module.exports = announcementModel;