import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import { Box, Text, Flex } from '@chakra-ui/react';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend );

interface SubEmissionData {
    transportsEmissions?: number;
    foodsEmissions?: number;
    lifestyleEmissions?: number;
    totalMobilityEmissions?: number;
    totalSwimEmissions?: number;
    totalDoubleDegreeEmissions?: number;
}

interface EmissionData {
    id: number;
    userId: number | null;
    tempId: string | null;
    totalEmissions: number;
    totalConsummationEmissions: number;
    totalCountryEmissions: number;
    subConsummationEmissions: SubEmissionData;
    subCountryEmissions: SubEmissionData;
    createdAt: string; 
}

// const generateRandomData = (total: number) => {
//     const portion1 = Math.random() * total;
//     const portion2 = Math.random() * (total - portion1);
//     const portion3 = total - portion1 - portion2;
//     return [portion1, portion2, portion3];
// };

const generateRandomData = (total: number, count: number) => {
    let remaining = total;
    return Array.from({ length: count }, (_, i) => {
        if (i === count - 1) return remaining;
        const value = Math.random() * remaining;
        remaining -= value;
        return value;
    });
};

// const generateRandomColors = (count: number) => {
//     return Array.from({ length: count }, () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
// };

const generateRandomColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;

const generateDistinctRandomColors = (count: number, excludeColors: string[] = []) => {
    const colors = [];
    while (colors.length < count) {
      const color = generateRandomColor();
      if (!excludeColors.includes(color)) {
        colors.push(color);
      }
    }
    return colors;
};


const ResponseVisualization = () => {
    // const [emissions, setEmissions] = useState<EmissionData[]>([]);
    const [emissions, setEmissionData] = useState({totalConsummationEmissions: 0, totalCountryEmissions: 0, subConsummationEmissions: [], subCountryEmissions: []});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/emissions`)
            .then(response => response.json())
            .then(data => {
                // setEmissions(data);
                const sortedData = data.sort((a: EmissionData, b: EmissionData) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    
                setEmissionData({
                    totalConsummationEmissions: sortedData[0].totalConsummationEmissions,
                    totalCountryEmissions: sortedData[0].totalCountryEmissions,
                    subConsummationEmissions: sortedData[0].subConsummationEmissions,
                    subCountryEmissions: sortedData[0].subCountryEmissions,
                  });
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching emissions data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Text>Loading emissions...</Text>;
    }

    const subConsummationCount = 3; 
    const subCountryCount = 15;
    // const consummationColors = generateRandomColors(subConsummationCount);
    // const countryColors = generateRandomColors(subCountryCount);
    


    // const latestEmission = emissions[0] || {};
    // const { subConsummationEmissions, subCountryEmissions } = latestEmission;
    // const chartData = {
    //     totalEmissions: latestEmission.totalEmissions || 0,
    //     totalConsummationEmissions: latestEmission.totalConsummationEmissions || 0,
    //     totalCountryEmissions: latestEmission.totalCountryEmissions || 0,
    // };

    // const subConsummationEmissions = generateRandomData(emissions.totalConsummationEmissions, subConsummationCount);
    // const subCountryEmissions = generateRandomData(emissions.totalCountryEmissions, subCountryCount);


    const consummationColors = generateDistinctRandomColors(emissions.subConsummationEmissions.length);
    const countryColors = generateDistinctRandomColors(emissions.subCountryEmissions.length, consummationColors);



    const consummationData = {
        labels: ['Transports Emissions', 'Foods Emissions'],
        datasets: [{
            label: 'Sub Consummation Emissions',
            data: emissions.subConsummationEmissions,
            backgroundColor: consummationColors,
            borderColor: consummationColors.map(color => color.replace('0.2', '1')),
            borderWidth: 1,
        }],
      };
    
      const countryData = {
        // labels: ['Total Mobility Emissions', 'Total Swim Emissions', 'Total Double Degree Emissions',  'Total Exchanged Research Emissions', 'Total Oversea Internship Emissions', 'Total Mobility Emissions1', 'Total Swim Emissions1', 'Total Double Degree Emissions1',  'Total Exchanged Research Emissions1', 'Total Oversea Internship Emissions1', 'Total Mobility Emissions2', 'Total Swim Emissions2', 'Total Double Degree Emissions2',  'Total Exchanged Research Emissions2', 'Total Oversea Internship Emissions2'],
        labels: ['Total Mobility Emissions (Ecole-Destination-Ecole)', 'Total Effet Rebond Emissions (Destination-Voyages-Destination)'],
        datasets: [{
            label: 'Sub Country Emissions',
            data: emissions.subCountryEmissions,
            backgroundColor: countryColors,
            borderColor: countryColors.map(color => color.replace('0.2', '1')),
            borderWidth: 1,
        }],
      };



    // const data = {
    //     labels: ['Total Emissions', 'Total Consummation Emissions', 'Total Country Emissions'],
    //     datasets: [{
    //         label: 'Emission Data',
    //         data: [chartData.totalEmissions, chartData.totalConsummationEmissions, chartData.totalCountryEmissions],
    //         backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
    //         borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
    //         borderWidth: 1,
    //     }],
    // };

    const consummationChartOptions = {
        plugins: {
            legend: {
                position: 'bottom' as const,
                // position: 'right' as const,
                // align: 'start' as const,
                // labels: {
                //     boxWidth: 20,
                //     padding: 20,
                // },
            },
        },
        maintainAspectRatio: false,
    };

    const countryChartOptions = {
        plugins: {
            legend: {
                position: 'bottom' as const,
                // position: 'right' as const,
                // align: 'start' as const,
                // labels: {
                //     boxWidth: 20,
                //     padding: 20,
                // },
            },
        },
        maintainAspectRatio: false,
    };    

    const chartHeight = "600px";

    return (
        // <Box>
        //     <Doughnut data={data} />
        // </Box>


        // <Flex bgColor="pink"  direction="column" align="center" justify="center" w="100%" /* height="30vh"  */  h="600px" >
        //     {/* <Box w="30%" h="600px" p={10} > */}
        //     <Box w="30%" p={10}>
        //         <Doughnut data={consummationData} options={consummationChartOptions} />
        //     </Box>
        //     {/* <Box w="50%" flex="1" > */}
        //     {/* <Box w="30%" h="600px" p={10}> */}
        //     <Box w="30%" p={10}>
        //         <Doughnut data={countryData} options={countryChartOptions} />
        //     </Box>
        // </Flex>


        // <Flex bgColor="pink" direction="column" align="center" justify="center" w="100%" h="600px">
        //     <Doughnut data={consummationData} options={consummationChartOptions} />
        //     {/* <Box w="60%" h={chartHeight} p={10}> */}
        //         <Doughnut data={countryData} options={countryChartOptions} />
        //     {/* </Box> */}
        // </Flex>

        <Flex direction="column" align="center" justify="center" w="80%" h="1000px" p ={4}>
            <Box w="100%" h="100%"  display="flex" justifyContent="center" alignItems="center" >
                <Doughnut data={consummationData} options={consummationChartOptions} />
            </Box>
            <Box w="100%" h="100%" display="flex" justifyContent="center" alignItems="center" p ={4} >
                <Doughnut data={countryData} options={countryChartOptions} />
            </Box>




        </Flex>
    );
};



export default ResponseVisualization;

