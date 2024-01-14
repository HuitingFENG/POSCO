// routes/emissionRoutes.js

const express = require('express');
const router = express.Router();
const Emission = require('../models/emission'); 
const { calculateEmissions } = require('../utils/emissionsCalculator');


router.get('/', async (req, res) => {
    try {
        const emissions = await Emission.findAll();
        res.json(emissions);
    } catch (error) {
        console.error('Error fetching emissions:', error);
        res.status(500).send('Error fetching emissions');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const emission = await Emission.findByPk(req.params.id);
        if (emission) {
            res.json(emission);
        } else {
            res.status(404).send('emission not found');
        }
    } catch (error) {
        console.error('Error fetching emission:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const emission = await Emission.findAll({ where: { userId: userId }, order: [['createdAt', 'DESC']] });
        if (emission) {
            res.json(emission);
        } else {
            res.status(404).send('emission not found');
        }
    } catch (error) {
        console.error('Error fetching emission:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { userId, responsesList } = req.body;
        const totalEmissions = calculateEmissions(responsesList);
        const emissionRecord = await Emission.create({
            userId,
            responsesList,
            totalEmissions
        });
        res.json({ success: true, emissionRecord });
    } catch (error) {
        console.error('Error creating emission:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedEmission = await Emission.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedEmission[0]) {
            res.send('Emission updated successfully');
        } else {
            res.status(404).send('Emission not found');
        }
    } catch (error) {
        console.error('Error updating emission:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Emission.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('Emission deleted successfully');
        } else {
            res.status(404).send('Emission not found');
        }
    } catch (error) {
        console.error('Error deleting emission:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
