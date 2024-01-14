// routes/referenceRoutes.js

const express = require('express');
const router = express.Router();
const Reference = require('../models/reference'); 

router.get('/', async (req, res) => {
    try {
        const references = await Reference.findAll();
        res.json(references);
    } catch (error) {
        console.error('Error fetching references:', error);
        res.status(500).send('Error fetching references');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const reference = await Reference.findByPk(req.params.id);
        if (reference) {
            res.json(reference);
        } else {
            res.status(404).send('reference not found');
        }
    } catch (error) {
        console.error('Error fetching reference:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newReference = await Reference.create(req.body);
        res.status(201).json(newReference);
    } catch (error) {
        console.error('Error creating reference:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedReference = await Reference.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedReference[0]) {
            res.send('reference updated successfully');
        } else {
            res.status(404).send('Reference not found');
        }
    } catch (error) {
        console.error('Error updating reference:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Reference.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('reference deleted successfully');
        } else {
            res.status(404).send('Reference not found');
        }
    } catch (error) {
        console.error('Error deleting reference:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
