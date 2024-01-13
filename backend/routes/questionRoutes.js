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

router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (question) {
            res.json(question);
        } else {
            res.status(404).send('Question not found');
        }
    } catch (error) {
        console.error('Error fetching question:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newQuestion = await Question.create(req.body);
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedQuestion = await Question.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedQuestion[0]) {
            res.send('Question updated successfully');
        } else {
            res.status(404).send('Question not found');
        }
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Question.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('Question deleted successfully');
        } else {
            res.status(404).send('Question not found');
        }
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
