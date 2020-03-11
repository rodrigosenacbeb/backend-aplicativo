const { subHours } = require('date-fns');
const mongoose = require('../config/database');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    type:        {type: Number,  required: true},
    title:       {type: String,  required: true},
    description: {type: String,  required: true},
    when:        {type: Date,    required: true},
    done:        {type: Boolean, default: false},
    created:     {type: Date,    default: subHours(Date.now(), 3)}
});

module.exports = mongoose.model('Task',TaskSchema);