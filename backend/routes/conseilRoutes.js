// routes/conseilRoutes.js

const express = require('express');
const router = express.Router();
const Conseil = require('../models/conseil'); 

router.get('/', async (req, res) => {
    try {
        const conseils = await Conseil.findAll();
        res.json(conseils);
    } catch (error) {
        console.error('Error fetching conseils:', error);
        res.status(500).send('Error fetching conseils');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const conseil = await Conseil.findByPk(req.params.id);
        if (conseil) {
            res.json(conseil);
        } else {
            res.status(404).send('conseil not found');
        }
    } catch (error) {
        console.error('Error fetching conseil:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const newconseil = await Conseil.create(req.body);
        res.status(201).json(newconseil);
    } catch (error) {
        console.error('Error creating conseil:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedconseil = await Conseil.update(req.body, {
            where: { id:  id }
        });
        if (updatedconseil[0]) {
            res.send('conseil updated successfully');
        } else {
            res.status(404).send('conseil not found');
        }
    } catch (error) {
        console.error('Error updating conseil:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Conseil.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.send('conseil deleted successfully');
        } else {
            res.status(404).send('conseil not found');
        }
    } catch (error) {
        console.error('Error deleting conseil:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
