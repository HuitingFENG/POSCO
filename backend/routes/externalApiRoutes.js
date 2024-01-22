const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define the base URL for the impactco2.fr API
const baseURL = 'https://impactco2.fr/api/v1';



// Define a new route to fetch and display data from the impactco2.fr API
router.get('/fetch-impactco2-data', async (req, res) => {
    try {
        const apiData = await fetchDataFromImpactCO2(); // Use the fetchDataFromImpactCO2 function

        // You can now use 'apiData' to display or process the data as needed
        res.json(apiData);
    } catch (error) {
        console.error('Error fetching data from impactco2.fr API:', error);
        res.status(500).send('Error fetching data from impactco2.fr API');
    }
});

async function fetchDataFromImpactCO2(distance) {
    try {
        const apiUrl = `${baseURL}/transport?km=${distance}&displayAll=1&transports=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C21&ignoreRadiativeForcing=0&numberOfPassenger=1&includeConstruction=1`;

        const responseFromApi = await axios.get(apiUrl);

        // Extract the data from the API response
        const apiData = responseFromApi.data;

        // You can process the 'apiData' here as needed

        // Return the data
        return apiData;
    } catch (error) {
        // Handle the error appropriately
        throw error;
    }
}

async function fetchDataFromImpactCO2ByIdThematique(idThematique) {
    try {
        const apiUrl = `${baseURL}/thematiques/ecv/${idThematique}?detail=1`;

        const responseFromApi = await axios.get(apiUrl);

        // Extract the data from the API response
        const apiData = responseFromApi.data;

        // You can process the 'apiData' here as needed

        // Return the data
        return apiData;
    } catch (error) {
        // Handle the error appropriately
        throw error;
    }
}


router.get('/fetch-impactco2-data/:distance', async (req, res) => {
    const distance = req.params.distance;
    try {
        const apiData = await fetchDataFromImpactCO2(distance);
        console.log("TEST apiData", apiData);
        res.json(apiData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error occurred');
    }
});



// async function fetchDataFromImpactCO2ByIdThematique(idThematique) {
//     try {
//         const apiUrl = `${baseURL}/thematiques/ecv/${idThematique}?detail=1`;
//         const response = await axios.get(apiUrl);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }


// Function to get the ECV value for a specific slug
async function getEcvForSlug(slug) {
    try {
        const data = await fetchDataFromImpactCO2ByIdThematique(4); // Assuming '4' is the correct thematic ID
        const item = data.data.find(element => element.slug === slug);
        return item ? item.ecv : null;
    } catch (error) {
        console.error('Error getting ECV for slug:', error);
        throw error;
    }
}


// async function fetchTransportDataFromImpactCO2(distance, slug) {
//     try {
//         const apiUrl = `${baseURL}/thematiques/ecv/${idThematique}?detail=1`;

//         const responseFromApi = await axios.get(apiUrl);

//         // Extract the data from the API response
//         const apiData = responseFromApi.data;

//         // You can process the 'apiData' here as needed

//         // Return the data
//         return apiData;
//     } catch (error) {
//         // Handle the error appropriately
//         throw error;
//     }
// }



module.exports = {
    router,
    fetchDataFromImpactCO2,
    fetchDataFromImpactCO2ByIdThematique,
    getEcvForSlug,
};
