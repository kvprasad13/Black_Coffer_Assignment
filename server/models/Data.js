const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    end_year: {
        type: Number,
        default: ""
    },
    intensity: {
        type: Number,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    insight: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    start_year: {
        type: Number,
        default: ""
    },
    impact: {
        type: String,
        default: ""
    },
    added: {
        type: Date,
        default: Date.now
    },
    published: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    relevance: {
        type: Number,
        required: true
    },
    pestle: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    likelihood: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Data = mongoose.model('data', dataSchema);

module.exports = Data;
