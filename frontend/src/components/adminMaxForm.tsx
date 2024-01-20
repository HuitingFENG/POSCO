import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast, VStack, Center, Flex, Text, Heading  } from "@chakra-ui/react";

const AdminMaxForm = () => {
    const currentYear = new Date().getFullYear();
    const [maxData, setMaxData] = useState({ year: currentYear.toString(), L1: '', L2: '', L3: '', M1: '', M2: '' });
    const toast = useToast();
    
    useEffect(() => {
        fetch(`http://localhost:3001/api/maxs/years/${currentYear}`)
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id );
            const currentMaxData = sortedData[0];
            if (currentMaxData) {
            setMaxData({
                year: currentMaxData.year.toString(),
                L1: currentMaxData.L1,
                L2: currentMaxData.L2,
                L3: currentMaxData.L3,
                M1: currentMaxData.M1,
                M2: currentMaxData.M2
            });
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);




    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setMaxData({ ...maxData, [e.target.name]: e.target.value });
    };

    const fetchMaxData = () => {
            fetch(`http://localhost:3001/api/maxs/years/${currentYear}`)
            .then(response => response.json())
            .then(data => {
                const latestMaxData = data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id )[0]; // Sort by id and take the latest one
                if (latestMaxData) {
                setMaxData({
                    year: latestMaxData.year.toString(),
                    L1: latestMaxData.L1,
                    L2: latestMaxData.L2,
                    L3: latestMaxData.L3,
                    M1: latestMaxData.M1,
                    M2: latestMaxData.M2
                });
                }
            })
            .catch(error => console.error('Error:', error));
        };

    useEffect(() => {
        fetchMaxData();
    }, []);


    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        try {
        const response = await fetch('http://localhost:3001/api/maxs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(maxData),
        });

        if (response.ok) {
            toast({ title: 'Max list added successfully', status: 'success' });
            // setMaxData({ year: currentYear.toString(), L1: '', L2: '', L3: '', M1: '', M2: '' });
            fetchMaxData();
            // Reset form or other post-submit actions
        } else {
            toast({ title: 'Error adding max list', status: 'error' });
        }
        } catch (error) {
        console.error('Error:', error);
        toast({ title: 'Error adding max list', status: 'error' });
        }
    };



  return (
    <Center width="100%">
      <Box border="1px solid gray" p={6} my={4} borderRadius="md" boxShadow="md" w="100%" maxW="500px">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} justify="center">
            <Heading as="h3" size="md" textAlign="center" mb={4} color="#003153" >Max Empreinte Carbon ( Kg / An ) </Heading>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="year" width="30%" >Année</FormLabel>
                <Input id="year" name="year" type="number" value={maxData.year} onChange={handleChange} readOnly width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="L1" width="30%" >L1</FormLabel>
                <Input id="L1" name="L1" type="number" placeholder={`Actuel: ${maxData.L1 || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="L2" width="30%" >L2</FormLabel>
                <Input id="L2" name="L2" type="number" placeholder={`Actuel: ${maxData.L2 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="L3" width="30%" >L3</FormLabel>
                <Input id="L3" name="L3" type="number" placeholder={`Actuel: ${maxData.L3 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="M1" width="30%" >M1</FormLabel>
                <Input id="M1" name="M1" type="number" placeholder={`Actuel: ${maxData.M1 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="M2" width="30%" >M2</FormLabel>
                <Input id="M2" name="M2" type="number" placeholder={`Actuel: ${maxData.M2 || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Button type="submit" colorScheme="blue" width="50%">Sauvegarder</Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};



export default AdminMaxForm;
