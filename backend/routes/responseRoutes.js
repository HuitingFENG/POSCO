// routes/responseRoutes.js

const express = require('express');
const router = express.Router();
const Response = require('../models/response');
const Emission = require('../models/emission');
const { countryEmissions } = require('../data/mockData');


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
    const responses = req.body.responses; 
    let responseInstances = [];

    for (const response of responses) {
    //   await Response.create(response);
    const newResponse = await Response.create(response);
      responseInstances.push(newResponse);
     /*  console.log("TEST: ", responses[4].answer); */
    }
    const responseIds = responseInstances.map(instance => instance.id);
    const total = calculation(responses, countryEmissions);
    const savedTotal = await Emission.create({
        userId: responses[0].userId, 
        responsesList: responseIds, 
        totalEmissions: total 
    });
    console.log("TEST savedTotal: ", savedTotal)
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
        const result = await Response.destroy({
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

function calculation(responses, countryEmissions) {
    let total = 0;
    const questionIdAnswerCountry = 7;
    const questionIdAnswerTransport = 8;
    // const questionIdList = [];

    responses.forEach(response => {
        console.log('TEST calculation: ', response);
        userId = response.userId;
        // questionIdList.push(response.questionId);
    });
    console.log("TEST userId: ", userId);

/*     for (const response of responses) {
        console.log("TEST response answer: ", response.answer);
    } */

    const checkLocation = responses.find(response => response.questionId === questionIdAnswerCountry).answer;
    const checkTransport = responses.find(response => response.questionId === questionIdAnswerTransport).answer;

    countryEmissions.forEach(item => {
/*         console.log('TEST countryEmissions: ', item);
        console.log('TEST countryEmissions location: ', item.location);
        console.log('TEST countryEmissions avion: ', item.avion); */
        if (item.location == checkLocation){
            if (item[checkTransport] !== undefined) {
                total = item[checkTransport];
            }
        }
    });

    console.log("TEST total: ", total);
    return total;
} 

