const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    tasknumber: {
        type: Number
    },
    gamename: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients",
        required: true
    },
    // Completed or Not completed
    status: {
        type: Boolean
    }
});

module.exports = mongoose.model('Employee', employeeSchema);