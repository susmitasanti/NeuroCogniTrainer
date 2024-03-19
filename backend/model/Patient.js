const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: Number,
        Editor: Number,
        Admin: {
            type: Number,
            default: 2001
        }

        // Admin:{
        //     type: Number,
        //     default: 5150
        // }
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors"
    }
});

module.exports = mongoose.model('Patient', patientSchema);