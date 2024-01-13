// routes/responseRoutes.js

const express = require('express');
const router = express.Router();
const Response = require('../models/response');

router.get('/', async (req, res) => {
    try {
        const responses = await Response.findAll();
        res.json(responses);
    } catch (error) {
        console.error('Error fetching responses:', error);
        res.status(500).send('Error fetching responses');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await Response.findByPk(req.params.id);
        if (response) {
            res.json(response);
        } else {
            res.status(404).send('Response not found');
        }
    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
  console.log("Received data:", req.body);
  try {
    /* const newResponse = await Response.create(req.body);
    res.status(201).json(newResponse); */
    const responses = req.body.responses; // Extract the responses array
    for (const response of responses) {
      await Response.create(response);
    }
    res.status(201).json({ message: "Responses saved successfully" });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedResponse = await Response.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedResponse[0]) {
            res.send('Response updated successfully');
        } else {
            res.status(404).send('Response not found');
        }
    } catch (error) {
        console.error('Error updating response:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Question.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('Response deleted successfully');
        } else {
            res.status(404).send('Response not found');
        }
    } catch (error) {
        console.error('Error deleting response:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

