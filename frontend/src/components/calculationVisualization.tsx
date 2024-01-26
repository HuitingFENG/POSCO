import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import { Box, Text, Flex, Button, useMediaQuery } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend );

interface SubEmissionData {
    transportsEmissions?: number;
    foodsEmissions?: number;
    totalMobilityEmissions?: number;
    totalEffetRebondEmissions?: number;
}

interface responses {
    id: number;
    userId: number;
    tempId: string;
    questionId : number;
    answer: string;
}

interface Emission {
    id: number;
    userId: number | null;
    tempId: string | null;
    responsesList: number[];
    totalEmissions: number;
    totalConsummationEmissions: number;
    totalCountryEmissions: number;
    subConsummationEmissions: number[];
    subCountryEmissions: number[];
    refDataImpactCO2List: number[];
    createdAt: string; 
}

interface Response {
    responseId: number;
    data: any;
}

interface Answers {
    [key: number]: string;
}

interface CalculationVisualizationProps {
    latestEmissionDataId: number;
    listForCalculation: number[];
}


interface FoodData {
    ecv: number;
    name: string;
    slug: string;
    footprint: number;
}

interface FoodApiResponse {
    data: FoodData[];
}

const CalculationVisualization = ({ latestEmissionDataId, listForCalculation }: CalculationVisualizationProps) => {
    const [emission, setEmission] = useState<Emission | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [answer, setAnswer] = useState<Answers>({});
    const [fetchedTransportData, setFetchedTransportData] = useState({});
    const [fetchedFoodData, setFetchedFoodData] = useState<FoodData | null>(null);

    

    useEffect(() => {
        console.log("TEST imported parameters from parent component: ", latestEmissionDataId, listForCalculation);
        setIsLoading(true);
        fetch(`http://localhost:3001/api/emissions/${latestEmissionDataId}`)
            .then(response => response.json())
            .then(data => {
                // const sortedData = data.sort((a: Emission, b: Emission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setEmission(data);
                console.log("TEST calculationVisualization fetch emissions data: ", emission);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching emissions data:', error);
                setIsLoading(false);
            });
    }, [latestEmissionDataId]);

    useEffect(() => {
        listForCalculation.forEach(responseId => {
            fetchDataByResponseId(responseId);
        });
    }, [listForCalculation]);
    

    // useEffect(() => {
    //     fetchDataByFoods();
    //     fetchDataByTransports();
    // }, []); 
    

    const fetchDataByResponseId = async (responseId: any) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/responses/${responseId}`);
            const data = await response.json();
            setAnswer((prevAnswers: any) => ({...prevAnswers, [responseId]: data.answer}));
        } catch (error) {
            console.error('Error fetching response data:', error);
        }
        setIsLoading(false);
    };
    

    // const fetchDataByTransports = async () => {
    //     try {
    //         const response = await fetch(`https://impactco2.fr/api/v1/thematiques/ecv/4?detail=1`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setFetchedTransportData(data);
    //         console.log("TEST setFetchedTransportData(data): ", data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // const fetchDataByFoods = async () => {
    //     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //     const targetUrl = 'https://impactco2.fr/api/v1/thematiques/ecv/2?detail=1';

    //     try {
    //         // const response = await fetch(`https://impactco2.fr/api/v1/thematiques/ecv/2?detail=1`);
    //         const response = await fetch(`${proxyUrl}${targetUrl}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         // const data = await response.json();
    //         // setFetchedFoodData(data);
    //         // console.log("TEST setFetchedFoodData(data): ", data);
    //         // const specificItem = data.data.find((item: { name: string; }) => item.name === answer[listForCalculation[3]]).ecv;
    //         // console.log("Specific item data:", specificItem);
    //         const data: FoodApiResponse = await response.json();
    //         const specificItem = data.data.find((item) => item.name === answer[listForCalculation[3]]);
    //         if (specificItem) {
    //             setFetchedFoodData(specificItem);
    //         }
    //         console.log("Specific item data:", specificItem);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };


    // const fetchDataFromBackend = async (endpoint: string, params = {}) => {
    //     try {
    //         const queryString = new URLSearchParams(params).toString();
    //         const url = `http://localhost:3001/api/${endpoint}?${queryString}`;
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return await response.json();
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // const fetchDataByFoods = async () => {
    //     try {
    //         const data = await fetchDataFromBackend('fetch-impactco2-data', { thematiqueId: 2 });
    //         const specificItem = data.data.find((item: { name: string; }) => item.name === 'Repas avec du boeuf');
    //         if (specificItem) {
    //             setFetchedFoodData(specificItem);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    // const fetchDataByTransports = async () => {
    //     try {
    //         const data = await fetchDataFromBackend('fetch-impactco2-data', { thematiqueId: 4 });
    //         const specificItem = data.data.find((item: { name: string; }) => item.name === 'TGV');
    //         if (specificItem) {
    //             setFetchedFoodData(specificItem);
    //         }

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };


    if (isLoading) {
        return <Text>Loading emissions...</Text>;
    }

    if (!listForCalculation || listForCalculation.length === 0) {
        return <Text>No data to display</Text>;
    }




    return (
        <Flex direction="column" align="center" justify="center" h="700px" width="100%" p ={4} gap={4} bgColor="#A4DDED" border="4px" borderColor="#0C2340" borderStyle="dashed">

            {/* { emission ? (
                <>
                <Flex bgColor="pink" flexDir="column"  >
                    <Text>Total Emissions: {emission.totalEmissions} Kg</Text>
                </Flex>
                
                <Flex bgColor="yellow" flexDir="column" >
                    <Text>Total Consummation Emissions : {emission.totalConsummationEmissions} Kg</Text>
                    <Text>Transports Emissions: {emission.subConsummationEmissions[0]} Kg</Text>
                    <Text>Foods Emissions: {emission.subConsummationEmissions[1]} Kg</Text>
                    <Text>(Q2 & Q3) Transports Emission d'un an  = 40 semaines de cours à l'école * 4 jours en présentiel par semaine * 2 trajets (aller-retour) * {answer[listForCalculation[1]]} km par trajet *  kg d'émission carbon avec le mode de transport ({answer[listForCalculation[2]]}) par km  </Text>
                    <Text>(Q4 & Q5) Foods Emissions d'un an = {answer[listForCalculation[4]]} nbrRepas par semaines * 52 semaines * kg d'émission carbon avec l'habitude alimentaire ({answer[listForCalculation[3]]}) </Text>
                </Flex>
                
                <Flex bgColor="orange" flexDir="column" >
                    <Text>Total Country Emissions: {emission.totalCountryEmissions} Kg</Text>
                    <Text>Total Mobility Emissions (Ecole-Destination-Ecole): {emission.subCountryEmissions[0]} Kg</Text>
                    <Text>Total Effet Rebond Emissions (Destination-Voyages-Destination): {emission.subCountryEmissions[1]} Kg</Text>
                    <Text>(Q6 & Q7) Total Mobility Emissions = 2 trajets (aller-retour) * kg d'émission carbon en un trajet pour partir et rentrer à la destination ({answer[listForCalculation[5]]}) * kg émission carbon avec le mode de transport ({answer[listForCalculation[6]]}) </Text>
                    <Text>(Q9 & Q10) Total Effet Rebond Emissions = 2 trajets (aller-retour) * {answer[listForCalculation[8]]} km par trajet * kg d'émission carbon avec le mode de transport ({answer[listForCalculation[9]]}) par km</Text>
                </Flex>
                </>
            ) : (
                <Text></Text>
            )} */}


            {emission ? (
                <>
                    <Flex  flexDir="column" p= {5} bgColor="white" border="4px" borderColor="#0C2340" >
                        <Text fontSize="lg" fontWeight="bold">Total Emissions: {emission.totalEmissions} Kg</Text>
                    </Flex>
                    
                    <Flex flexDir="column"  p= {2} bgColor="white" border="4px" borderColor="#0C2340" >
                        <Text fontSize="lg" fontWeight="bold">Total Consummation Emissions: {emission.totalConsummationEmissions} Kg</Text>
                        <Text mt={2}>Transports Emissions: {emission.subConsummationEmissions[0]} Kg</Text>
                        <Text>Foods Emissions: {emission.subConsummationEmissions[1]} Kg</Text>
                        <Text mt={2} fontWeight="bold">Transports Emission d'un an:</Text>
                        <Text>40 semaines de cours * 4 jours en présentiel/semaine * 2 trajets/jour * {answer[listForCalculation[1]]} km/trajet</Text>
                        <Text>* {emission.refDataImpactCO2List[0]} kg émission carbon avec {answer[listForCalculation[2]]} par km</Text>
                        <Text mt={2} fontWeight="bold">Foods Emissions d'un an:</Text>
                        <Text>{answer[listForCalculation[4]]} repas/semaine * 52 semaines</Text>
                        <Text>* {emission.refDataImpactCO2List[1]} kg émission carbon avec {answer[listForCalculation[3]]}</Text>
                    </Flex>
                    
                    <Flex flexDir="column" p= {2} bgColor="white" border="4px" borderColor="#0C2340" >
                        <Text fontSize="lg" fontWeight="bold">Total Country Emissions: {emission.totalCountryEmissions} Kg</Text>
                        <Text mt={2}>Total Mobility Emissions (Ecole-Destination-Ecole): {emission.subCountryEmissions[0]} Kg</Text>
                        <Text>Total Effet Rebond Emissions (Destination-Voyages-Destination): {emission.subCountryEmissions[1]} Kg</Text>
                        <Text mt={2} fontWeight="bold">Total Mobility Emissions:</Text>
                        <Text>2 trajets (aller-retour) * {emission.refDataImpactCO2List[2]} kg émission carbon/trajet</Text>
                        <Text>pour la destination {answer[listForCalculation[5]]} avec {answer[listForCalculation[7]]} </Text>
                        <Text mt={2} fontWeight="bold">Total Effet Rebond Emissions:</Text>
                        <Text>2 trajets (aller-retour) * {answer[listForCalculation[9]]} km/trajet</Text>
                        <Text>*{emission.refDataImpactCO2List[3]} kg émission carbon avec {answer[listForCalculation[10]]} par km</Text>
                    </Flex>
                </>
            ) : (
                <Text>No data available</Text>
            )}
        </Flex>
    );
};


export default CalculationVisualization;

