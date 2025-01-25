const mongoose = require('mongoose');

// Define the Thread schema
const ThreadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Thread = mongoose.model('Thread', ThreadSchema);

module.exports = Thread;
