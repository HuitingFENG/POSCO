// routes/questionRoutes.js

const express = require('express');
const router = express.Router();
const Question = require('../models/question'); // Adjust the path as necessary

router.get('/', async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).send('Error fetching questions');
    }
});

module.exports = router;
