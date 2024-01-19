// routes/maxRoutes.js

const express = require('express');
const router = express.Router();
const Max = require('../models/max'); 

router.get('/', async (req, res) => {
    try {
        // const maxs = await max.findAll();
        const queryCode = req.query.code;
        let queryOptions = {};
        if (queryCode) {
            queryOptions = {
                where: { code: queryCode }
            };
        }
        const maxs = await Max.findAll(queryOptions);
        res.json(maxs);
        
    } catch (error) {
        console.error('Error fetching maxs:', error);
        res.status(500).send('Error fetching maxs');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const max = await Max.findByPk(req.params.id);
        if (max) {
            res.json(max);
        } else {
            res.status(404).send('max not found');
        }
    } catch (error) {
        console.error('Error fetching max:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newmax = await Max.create(req.body);
        res.status(201).json(newmax);
    } catch (error) {
        console.error('Error creating max:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedmax = await Max.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedmax[0]) {
            res.send('max updated successfully');
        } else {
            res.status(404).send('max not found');
        }
    } catch (error) {
        console.error('Error updating max:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Max.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('max deleted successfully');
        } else {
            res.status(404).send('max not found');
        }
    } catch (error) {
        console.error('Error deleting max:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
