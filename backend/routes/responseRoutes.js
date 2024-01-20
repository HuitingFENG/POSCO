// routes/responseRoutes.js

const express = require('express');
const router = express.Router();
const Response = require('../models/response');
const Emission = require('../models/emission');
const Question = require('../models/question');
const Max = require('../models/max');
const { consummationEmissions, countryEmissions, maxMobiliteCarbonEmissionList  } = require('../data/mockData');


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


router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const responses = await Response.findAll({ 
            where: { userId: userId },
            include: [{
                model: Question,
                as: 'question' 
            }] 
        });
        res.json(responses);
    } catch (error) {
        console.error('Error fetching responses for user:', error);
    res.status(500).send('Internal Server Error');
}
});



/* 
router.post('/temporary', async (req, res) => {
    const { responses, tempId } = req.body;

    try {
        if (tempId) {
            const tempUser = await User.findOrCreate({
                where: { tempId: tempId },
                defaults: { tempId: tempId }
            });

            const tempUserId = tempUser[0].userId;

            for (const response of responses) {
                await Response.create({
                    userId: tempUserId,
                    questionId: response.questionId,
                    answer: response.answer
                });
            }
        } else {
            for (const response of responses) {
                await Response.create({
                    userId: response.userId,
                    questionId: response.questionId,
                    answer: response.answer
                });
            }
        }
        console.log("TEST : ", );
        res.status(200).json({ message: 'Responses saved successfully' });
    } catch (error) {
        console.error('Error saving temporary responses:', error);
        res.status(500).send('Internal Server Error');
    }
});
 */


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
    const [total, totalConsummationEmissions, totalCountryEmissions, totalOverMax] = calculationForAll(responses, countryEmissions, consummationEmissions);
    console.log("TEST total, totalConsummationEmissions, totalCountryEmissions, totalOverMax: ", total, totalConsummationEmissions, totalCountryEmissions, totalOverMax)
    const savedTotal = await Emission.create({
        userId: responses[0].userId, 
        tempId: responses[0].tempId, 
        responsesList: responseIds, 
        totalEmissions: total,
        totalConsummationEmissions: totalConsummationEmissions,
        totalCountryEmissions: totalCountryEmissions,
        overMax: totalOverMax,
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






function calculation(responses, countryEmissions, consummationEmissions) {
    let total = 0;
    let totalCountryEmissions = 0;
    let totalConsummationEmissions = 0;
    const questionIdDistanceEcoleDomicile = 2;
    const questionIdTransportEcoleDomicile = 3;
    const questionIdNombreViandeRepas = 4;
    const questionIdTypeViande = 5;
    const questionIdCountry = 6;
    const questionIdTransport = 7;
    const questionIdDistanceVoyages = 9;
    const questionIdTransportVoyages = 10;

    const questionIdList = [];



    responses.forEach(response => {
        // console.log('TEST calculation: ', response);
        userId = response.userId;
        questionIdList.push(response.questionId);
    });

    const checkDistanceEcoleDomicile = responses.find(response => response.questionId === questionIdDistanceEcoleDomicile).answer;
    const checkTransportEcoleDomicile = responses.find(response => response.questionId === questionIdTransportEcoleDomicile).answer;
    const checkNombreViandeRepas = responses.find(response => response.questionId === questionIdNombreViandeRepas).answer;
    const checkTypeViande = responses.find(response => response.questionId === questionIdTypeViande).answer;

    const checkLocation = responses.find(response => response.questionId === questionIdCountry).answer;
    const checkTransport = responses.find(response => response.questionId === questionIdTransport).answer;
    const checkDistanceVoyages = responses.find(response => response.questionId === questionIdDistanceVoyages).answer;
    const checkTransportVoyages = responses.find(response => response.questionId === questionIdTransportVoyages).answer;

    const valueTransportEcoleDomicile = consummationEmissions.find(item => item.name == checkTransportEcoleDomicile).number;
    const valueTypeViande = consummationEmissions.find(item => item.name == checkTypeViande).number;
    const valueTransportVoyages = consummationEmissions.find(item => item.name == checkTransportVoyages).number;

    totalConsummationEmissions += checkDistanceEcoleDomicile * 40 * 7 * 4 * 2 * valueTransportEcoleDomicile; 
    totalConsummationEmissions += checkNombreViandeRepas * valueTypeViande * 52;

    totalCountryEmissions += checkDistanceVoyages * 2 * valueTransportVoyages;

/* 
    questionIdList.forEach(item_q => {
        consummationEmissions.forEach(item => {
            if (item.name == checkTransportEcoleDomicile && item_q == questionIdTransportEcoleDomicile) {
                totalConsummationEmissions += checkDistanceEcoleDomicile * 40 * 7 * 4 * 2 * item.number; // nombre de voyage maison-efrei pour un an : 40 semaines de cours x 4 jours de présentiel x (aller+retour) → 40 x 7 x 4 x2 = 2440 
                console.log("TEST totalConsummationEmissions 1:", totalConsummationEmissions);
                console.log("TEST item_q & questionIdTransportEcoleDomicile: ", item_q, questionIdTransportEcoleDomicile);
                console.log("TEST checkDistanceEcoleDomicile:", checkDistanceEcoleDomicile);
                console.log("TEST item.number: ", item.number);
            }
            if (item.name == checkTransportVoyages  && item_q == questionIdTransportVoyages) {
                totalCountryEmissions += checkDistanceVoyages * 2 * item.number; // un seul voyage aller-retour destination-paysacote
                console.log("TEST totalCountryEmissions:", totalCountryEmissions);
                console.log("TEST item_q & questionIdTransportVoyages: ", item_q, questionIdTransportVoyages);
                console.log("TEST checkDistanceVoyages:", checkDistanceVoyages);
                console.log("TEST item.number: ", item.number);
            }
            if (item.name == checkTypeViande) {
                totalConsummationEmissions += checkNombreViandeRepas * item.number * 52; // one year has around 52 weeks.
                console.log("TEST totalConsummationEmissions 2:", totalConsummationEmissions);
                console.log("TEST checkNombreViandeRepas:", checkNombreViandeRepas);
                console.log("TEST item.number: ", item.number);
            }
            console.log("TEST totalConsummationEmissions 3:", totalConsummationEmissions) 
        });
    });
 */
    countryEmissions.forEach(item => {

        if (item.location == checkLocation){
            if (item[checkTransport] !== undefined) {
                totalCountryEmissions += (item[checkTransport] * 2) ; // un seul voyage aller-retour france-destination
            }
        }
    });

    console.log("TEST ref. of totalConsummationEmissions 4: ", 40*7*4*2*5*0.11 + 5.51*7*52); // bus, 5km de distance maison-efrei + boeuf, 7 fois par semaine, 52 semaines en un an
    console.log("TEST totalConsummationEmissions 4: ", totalConsummationEmissions);
    console.log("TEST ref. of totalCountryEmissions: ", 129*2+20*2*0.215); // stoke-en-trent, avion aller-retour, 20km de voayge aller-retour en avion
    console.log("TEST totalCountryEmissions: ", totalCountryEmissions);

    total = totalCountryEmissions + totalConsummationEmissions;
    console.log("TEST total: ", total);
    return [total, totalConsummationEmissions, totalCountryEmissions];
};



function calculationForAll(responses, countryEmissions, consummationEmissions) {
    let totalConsummationEmissions = 0;
    let totalCountryEmissions = 0;
    let totalOverMax = false;

    // Extract responses by questionId for easier access
    const responseByQuestionId = responses.reduce((acc, response) => {
        acc[response.questionId] = response.answer;
        return acc;
    }, {});

    // Helper function to get the 'number' value by 'name' from consummationEmissions
    function getValueByName(dataArray, name) {
        const item = dataArray.find(item => item.name === name);
        return item ? item.number : 0;
    }

    // Calculate Consummation Emissions
    totalConsummationEmissions += responseByQuestionId[2] * 40 * 7 * 4 * 2 * getValueByName(consummationEmissions, responseByQuestionId[3]);
    totalConsummationEmissions += responseByQuestionId[4] * getValueByName(consummationEmissions, responseByQuestionId[5]) * 52;

    // Calculate Country Emissions
    const locationEmission = countryEmissions.find(item => item.location === responseByQuestionId[6]);
    if (locationEmission && locationEmission[responseByQuestionId[7]] !== undefined) {
        totalCountryEmissions += locationEmission[responseByQuestionId[7]] * 2;
    }
    // totalCountryEmissions += responseByQuestionId[9] * 2 * getValueByName(consummationEmissions, responseByQuestionId[10]);
    // Assign default value 0 if response for question 9 and 10 is not available
    const responseForQ9 = responseByQuestionId[9] !== undefined ? responseByQuestionId[9] : 0;
    const responseForQ10 = responseByQuestionId[10] !== undefined ? responseByQuestionId[10] : ""; // Assuming a default transport mode if not answered

    totalCountryEmissions += responseForQ9 * 2 * getValueByName(consummationEmissions, responseForQ10);

  



    // Calculate total emissions
    const total = totalCountryEmissions + totalConsummationEmissions;

    // Logging for reference and debugging
    console.log("Reference totalConsummationEmissions: ", 40*7*4*2*5*0.11 + 5.51*7*52); // Example calculation for bus and beef
    console.log("Total Consummation Emissions: ", totalConsummationEmissions);
    console.log("Reference totalCountryEmissions: ", 129*2+20*2*0.215); // Example calculation for a specific country and plane
    console.log("Total Country Emissions: ", totalCountryEmissions);
    console.log("Total Emissions: ", total);



    const currentYear = new Date().getFullYear();
    // console.log("Current Year: ", currentYear); 
    const tempAnswer = responseByQuestionId[1];
    // console.log("tempAnswer: ", tempAnswer);
    // const yearData = maxMobiliteCarbonEmissionList.find(item => item.year === currentYear);
    const yearDataList = maxMobiliteCarbonEmissionList.filter(item => item.year === currentYear);
    const highestIdEntry = yearDataList.reduce((prev, current) => (prev.id > current.id) ? prev : current, {});

    // if (highestIdEntry && highestIdEntry[tempAnswer] !== undefined) {
    //     console.log("TEST maxMobiliteCarbonEmissionList: ", highestIdEntry[tempAnswer]);
    // } else {
    //     console.log("No data found for the year ", currentYear);
    // };

    if ( totalCountryEmissions > highestIdEntry[tempAnswer] ) {
        totalOverMax = true;
    };
    // console.log("TEST totalOverMax: ", totalOverMax);

    return [total, totalConsummationEmissions, totalCountryEmissions, totalOverMax];
};



function calculationForConsummationEmissions () {
    let totalTransportEmissions = 0;
    let result = [];

    return result;
};


function calculationForCountryEmissions (responses, countryEmissions, consummationEmissions) {
    let totalMobiliteEmissions = [];
    let totalSwimEmissions = [];
    let result = {totalMobiliteEmissions, totalSwimEmissions};


    
    console.log("TEST result: ", result);
    return result;
};