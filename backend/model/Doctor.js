const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: Number,
        Editor: Number,
        Admin: {
            type: Number,
            default: 1984
        }
        // Editor: {
        //     type: Number,
        //     default: 1984
        // }
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('Doctor', doctorSchema);