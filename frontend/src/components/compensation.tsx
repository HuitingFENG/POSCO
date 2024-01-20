import React, { useState, useEffect } from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center, Icon, Table, Thead, Tbody, Tr, Th, Td, Heading, List,ListItem,ListIcon } from "@chakra-ui/react";
import { MdKeyboardArrowRight, MdCheckCircle } from 'react-icons/md';


interface Compensation {
    id: number;
    type: string;
    options?: string[];
}


const CompensationActions = () => {
    const [compensations, setCompensations] = useState<Compensation[]>([]);


    useEffect(() => {
        fetch(`http://localhost:3001/api/compensations/`)
        .then(response => response.json())
        .then(data => {
          console.log("TEST data : ", data);
          setCompensations(data);
        })
        .catch(error => console.error('Error fetching compensations:', error));
    }, []);


    return (
        // <Flex flexDirection="column" gap={5} alignItems="center" justifyContent="center">
        // </Flex>
        <Flex p={10} alignItems="center" justifyContent="center" flexDirection="column"  gap={10}>
            <Box>
            {compensations.map((compensation, compensationIndex) => (
                <Box key={compensation.id} mb={10}>
                <Heading size="md" mb={4}> {/* Increased margin bottom for the Heading */}
                    {`${compensationIndex + 1}. ${compensation.type}`}
                </Heading>
                {compensation.options && (
                    <List spacing={4}>
                    {compensation.options.map((option, optionIndex) => (
                        <ListItem 
                        key={optionIndex} 
                        display="flex" 
                        alignItems="center"
                        mt={optionIndex === 0 ? 4 : 0} /* Increased top margin for the first ListItem */
                        >
                        <MdCheckCircle color="green" style={{ marginRight: '8px' }} />
                        <Text>{`${compensationIndex + 1}.${optionIndex + 1} ${option}`}</Text>
                        </ListItem>
                    ))}
                    </List>
                )}
                </Box>
            ))}
            </Box>
        </Flex>
    );
};


export default CompensationActions;