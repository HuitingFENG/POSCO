// routes/compensationRoutes.js

const express = require('express');
const router = express.Router();
const Compensation = require('../models/compensation'); 

router.get('/', async (req, res) => {
    try {
        const compensations = await Compensation.findAll();
        res.json(compensations);
    } catch (error) {
        console.error('Error fetching compensations:', error);
        res.status(500).send('Error fetching compensations');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const compensation = await Compensation.findByPk(req.params.id);
        if (compensation) {
            res.json(compensation);
        } else {
            res.status(404).send('compensation not found');
        }
    } catch (error) {
        console.error('Error fetching compensation:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newcompensation = await Compensation.create(req.body);
        res.status(201).json(newcompensation);
    } catch (error) {
        console.error('Error creating compensation:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedcompensation = await Compensation.update(req.body, {
            where: { id:  id }
        });
        if (updatedcompensation[0]) {
            res.send('compensation updated successfully');
        } else {
            res.status(404).send('compensation not found');
        }
    } catch (error) {
        console.error('Error updating compensation:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Compensation.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('compensation deleted successfully');
        } else {
            res.status(404).send('compensation not found');
        }
    } catch (error) {
        console.error('Error deleting compensation:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
