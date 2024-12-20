const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: false,
    }
}, { timestamps: true });

const employeeModel = mongoose.model('Employee', employeeSchema);
module.exports = employeeModel;