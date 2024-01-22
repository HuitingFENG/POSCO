import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast, VStack, Center, Flex, Text, Heading  } from "@chakra-ui/react";

const AdminMaxForm = () => {
    const currentYear = new Date().getFullYear();
    const [maxData, setMaxData] = useState({ year: currentYear.toString(), PGE_L3_FISE: '', PGE_L3_FISA: '', PEx_B2: '', PEx_M2_Msc_Cyber: '', PEx_M2_Optionnelle: '' });
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
                PGE_L3_FISE: currentMaxData.PGE_L3_FISE,
                PGE_L3_FISA: currentMaxData.PGE_L3_FISA,
                PEx_B2: currentMaxData.PEx_B2,
                PEx_M2_Msc_Cyber: currentMaxData.PEx_M2_Msc_Cyber,
                PEx_M2_Optionnelle: currentMaxData.PEx_M2_Optionnelle
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
                    PGE_L3_FISE: latestMaxData.PGE_L3_FISE,
                    PGE_L3_FISA: latestMaxData.PGE_L3_FISA,
                    PEx_B2: latestMaxData.PEx_B2,
                    PEx_M2_Msc_Cyber: latestMaxData.PEx_M2_Msc_Cyber,
                    PEx_M2_Optionnelle: latestMaxData.PEx_M2_Optionnelle
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
            // setMaxData({ year: currentYear.toString(), PGE_PEx_B2_FISE: '', PGE_PEx_B2_FISA: '', PEx_B2: '', PEx_PEx_M2_Optionnelle_Msc_Cyber: '', PEx_M2_Optionnelle: '' });
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
      <Box border="1px solid gray" p={6} my={4} borderRadius="md" boxShadow="md" w="100%" maxW="800px">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} justify="center">
            <Heading as="h3" size="md" textAlign="center" mb={4} color="#003153" >Max Empreinte Carbon ( Kg / An ) </Heading>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="year" width="30%" >Année</FormLabel>
                <Input id="year" name="year" type="number" value={maxData.year} onChange={handleChange} readOnly width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PGE_L3_FISE" width="30%" >PGE_L3_FISE</FormLabel>
                <Input id="PGE_L3_FISE" name="PGE_L3_FISE" type="number" placeholder={`Actuel: ${maxData.PGE_L3_FISE || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PGE_L3_FISA" width="30%" >PGE_L3_FISA</FormLabel>
                <Input id="PGE_L3_FISA" name="PGE_L3_FISA" type="number" placeholder={`Actuel: ${maxData.PGE_L3_FISA || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_B2" width="30%" >PEx_B2</FormLabel>
                <Input id="PEx_B2" name="PEx_B2" type="number" placeholder={`Actuel: ${maxData.PEx_B2 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_M2_Msc_Cyber" width="30%" >PEx_M2_Msc_Cyber</FormLabel>
                <Input id="PEx_M2_Msc_Cyber" name="PEx_M2_Msc_Cyber" type="number" placeholder={`Actuel: ${maxData.PEx_M2_Msc_Cyber || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_M2_Optionnelle" width="30%" >PEx_M2_Optionnelle</FormLabel>
                <Input id="PEx_M2_Optionnelle" name="PEx_M2_Optionnelle" type="number" placeholder={`Actuel: ${maxData.PEx_M2_Optionnelle || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Button type="submit" colorScheme="blue" width="50%">Sauvegarder</Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};



export default AdminMaxForm;
