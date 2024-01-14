
const calculateEmissions = (responsesList) => {
    let totalEmissions = 10;

    for (const response of responsesList) {
        console.log("Processing response: ", response);
    }

    return totalEmissions;
};

module.exports = { calculateEmissions };


