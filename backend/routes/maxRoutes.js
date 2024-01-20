// routes/maxRoutes.js

const express = require('express');
const router = express.Router();
const Max = require('../models/max'); 
const { maxMobiliteCarbonEmissionList } = require('../data/mockData');

router.get('/', async (req, res) => {
    try {
        // const maxs = await max.findAll();
        const queryCode = req.query.code;
        let queryOptions = {};
        if (queryCode) {
            queryOptions = {
                where: { year: queryCode }
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

// router.get('/years/:year', async (req, res) => {
//     try {
//         const year = parseInt(req.params.year);
//         const data = maxMobiliteCarbonEmissionList.filter(item => item.year === year);
//         // If there are multiple entries for the same year, you might want to handle that (e.g., get the latest entry)
//         if (data.length > 0) {
//             res.json(data);
//         } else {
//             res.status(404).send('Data not found for the specified year');
//         }
//     } catch (error) {
//         console.error('Error fetching max:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.get('/years/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year);
        const data = await Max.findAll({
            where: {year : year},
            order: [["updatedAt", "DESC"]]
        });

        if (data.length > 0) {
            res.json(data); // Return the most recent entry
        } else {
            res.status(404).send('Data not found for the specified year');
        }
    } catch (error) {
        console.error('Error fetching max:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.post('/', async (req, res) => {
    try {
        const newMax = await Max.create(req.body);
        res.status(201).json(newMax);
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
