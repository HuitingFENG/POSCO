// ResponseVisualization.js
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Text, Flex, VStack, } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResponseData {
    /* userId?: number; 
    tempId?: string; 
    questionId: number;
    answer: string; */
    id: number;
    userId: number | null;
    tempId: string | null;
    questionId: number;
    answer: string;
    createdAt: string;
    updatedAt: string;
}


const ResponseVisualization = () => {
    const [responses, setResponses] = useState<ResponseData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3001/api/responses')
            .then(response => response.json())
            .then((data: ResponseData[])=> {
                setResponses(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching response data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Text>Loading responses...</Text>;
    }


    const numericAnswers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const backgroundColors = numericAnswers.map(() => getRandomColor());
    const borderColors = backgroundColors.map(color => color.replace('0.2', '1'));


    const data = {
        labels: responses.map((_, index) => `Response ${index + 1}`),
        datasets: [{
            label: 'Numeric Responses',
            data: numericAnswers, 
            backgroundColor: backgroundColors, 
            borderColor: borderColors,
            borderWidth: 1,
        }],
    };

    const options = {
        plugins: {
            legend: {
                position: 'left'  as const,
                // display: false,
            },
        },
    };

    return (
        <Box flex="1">
            <Doughnut data={data} options={options} />
        </Box> 
        
        // <Flex direction={{ base: "column", md: "row" }} p={4} align="stretch">
        //     {/* Separate Labels Box (if needed) */}
        //     <VStack flex="1" spacing={4} justifyContent="center">
        //         {data.labels.map((label, index) => (
        //             <Text key={index}>{label}: {numericAnswers[index]}</Text>
        //         ))}
        //     </VStack>

        //     {/* Doughnut Chart Box */}
        //     <Box flex="1">
        //         <Doughnut data={data} options={options} />
        //     </Box>
        // </Flex>

    );
};


export default ResponseVisualization;

