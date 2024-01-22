// routes/optionRoutes.js

const express = require('express');
const router = express.Router();
const Option = require('../models/option'); 

router.get('/', async (req, res) => {
    try {
        const options = await Option.findAll();
        res.json(options);
    } catch (error) {
        console.error('Error fetching options:', error);
        res.status(500).send('Error fetching options');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const option = await Option.findByPk(req.params.id);
        if (option) {
            res.json(option);
        } else {
            res.status(404).send('option not found');
        }
    } catch (error) {
        console.error('Error fetching option:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newoption = await Option.create(req.body);
        res.status(201).json(newoption);
    } catch (error) {
        console.error('Error creating option:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedoption = await Option.update(req.body, {
            where: { id:  id }
        });
        if (updatedoption[0]) {
            res.send('option updated successfully');
        } else {
            res.status(404).send('option not found');
        }
    } catch (error) {
        console.error('Error updating option:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Option.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('option deleted successfully');
        } else {
            res.status(404).send('option not found');
        }
    } catch (error) {
        console.error('Error deleting option:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

