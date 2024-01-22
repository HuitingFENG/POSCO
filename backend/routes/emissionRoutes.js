// routes/emissionRoutes.js

const express = require('express');
const router = express.Router();
const Emission = require('../models/emission'); 
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const emissions = await Emission.findAll();
        res.json(emissions);
    } catch (error) {
        console.error('Error fetching emissions:', error);
        res.status(500).send('Error fetching emissions');
    }
});


// router.get('/searchByResponses', async (req, res) => {
//     const responsesString = req.query.responses;
//     if (!responsesString) {
//         return res.status(400).send('Responses query parameter is missing');
//     }

//     try {
//         // Convert responses to a JSON string for comparison
//         const responsesArray = JSON.parse(responsesString);

//         const emission = await Emission.findOne({
//             where: sequelize.where(
//                 sequelize.fn('JSON_CONTAINS', sequelize.col('responsesList'), sequelize.literal(`'${responsesArray}'`)),
//                 1
//             )
//         });

//         if (emission) {
//             res.json(emission);
//         } else {
//             res.status(404).send('No emission found with the given responses list');
//         }
//     } catch (error) {
//         console.error('Error fetching emission:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



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
        const emission = await Emission.findAll({ 
            where: { userId: userId }, 
            // include: [{
            //     model: User,
            //     as: "user"
            // }],
            order: [['createdAt', 'DESC']] 
        });
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

router.get('/temporary/:tempId', async (req, res) => {
    try {
        const tempId = req.params.tempId;
        const emission = await Emission.findAll({ 
            where: { tempId: tempId }, 
            // include: [{
            //     model: User,
            //     as: "user"
            // }],
            order: [['createdAt', 'DESC']] 
        });
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


