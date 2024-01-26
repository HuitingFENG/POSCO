import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, useToast, VStack, Center, Flex, Text, Heading, useMediaQuery  } from "@chakra-ui/react";

const AdminMaxForm = () => {
    const [isLargerThan768px] = useMediaQuery("(min-width: 768px)");
    const currentYear = new Date().getFullYear();
    const [maxData, setMaxData] = useState({ year: currentYear.toString(), PGE_L1: '', PGE_L2: '', PGE_L3: '', PGE_M1: '', PGE_M2: '', PEx_B1: '', PEx_B2: '', PEx_B3: '', PEx_MS1: '', PEx_MS2_Cyber: '', PEx_MS2_Optionnelle: '', Autres: '' });
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
                PGE_L1: currentMaxData.PGE_L1,
                PGE_L2: currentMaxData.PGE_L2,
                PGE_L3: currentMaxData.PGE_L3,
                PGE_M1: currentMaxData.PGE_M1,
                PGE_M2: currentMaxData.PGE_M2,
                PEx_B1: currentMaxData.PEx_B1,
                PEx_B2: currentMaxData.PEx_B2,
                PEx_B3: currentMaxData.PEx_B3,
                PEx_MS1: currentMaxData.PEx_MS1,
                PEx_MS2_Cyber: currentMaxData.PEx_MS2_Cyber,
                PEx_MS2_Optionnelle: currentMaxData.PEx_MS2_Optionnelle,
                Autres: currentMaxData.Autres,
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
                    PGE_L1: latestMaxData.PGE_L1,
                    PGE_L2: latestMaxData.PGE_L2,
                    PGE_L3: latestMaxData.PGE_L3,
                    PGE_M1: latestMaxData.PGE_M1,
                    PGE_M2: latestMaxData.PGE_M2,
                    PEx_B1: latestMaxData.PEx_B1,
                    PEx_B2: latestMaxData.PEx_B2,
                    PEx_B3: latestMaxData.PEx_B3,
                    PEx_MS1: latestMaxData.PEx_MS1,
                    PEx_MS2_Cyber: latestMaxData.PEx_MS2_Cyber,
                    PEx_MS2_Optionnelle: latestMaxData.PEx_MS2_Optionnelle,
                    Autres: latestMaxData.Autres,
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
            // setMaxData({ year: currentYear.toString(), PGE_PGE_L3_FISE: '', PGE_PGE_L3_FISA: '', PGE_L3: '', PEx_PGE_M2_Msc_Cyber: '', PGE_M2: '' });
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
      <Box border="1px solid gray" p={6} my={4} borderRadius="md" boxShadow="md" w="100%" maxW={isLargerThan768px ? "800px" : "100%"}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} justify="center">
            <Heading as="h3" size={["sm", "md", "md"]} textAlign="center" mb={[2, 4, 4]} color="#003153" >Max Empreinte Carbon ( Kg / An ) </Heading>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="year" width="30%" >Année</FormLabel>
                <Input id="year" name="year" type="number" value={maxData.year} onChange={handleChange} readOnly width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PGE_L1" width="30%" >PGE_L1</FormLabel>
                <Input id="PGE_L1" name="PGE_L1" type="number" placeholder={`Actuel: ${maxData.PGE_L1 || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PGE_L2" width="30%" >PGE_L2</FormLabel>
                <Input id="PGE_L2" name="PGE_L2" type="number" placeholder={`Actuel: ${maxData.PGE_L2 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PGE_L3" width="30%" >PGE_L3</FormLabel>
                <Input id="PGE_L3" name="PGE_L3" type="number" placeholder={`Actuel: ${maxData.PGE_L3 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PGE_M1" width="30%" >PGE_M1</FormLabel>
                <Input id="PGE_M1" name="PGE_M1" type="number" placeholder={`Actuel: ${maxData.PGE_M1 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PGE_M2" width="30%" >PGE_M2</FormLabel>
                <Input id="PGE_M2" name="PGE_M2" type="number" placeholder={`Actuel: ${maxData.PGE_M2 || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_B1" width="30%" >PEx_B1</FormLabel>
                <Input id="PEx_B1" name="PEx_B1" type="number" placeholder={`Actuel: ${maxData.PEx_B1 || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_B2" width="30%" >PEx_B2</FormLabel>
                <Input id="PEx_B2" name="PEx_B2" type="number" placeholder={`Actuel: ${maxData.PEx_B2 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_B3" width="30%" >PEx_B3</FormLabel>
                <Input id="PEx_B3" name="PEx_B3" type="number" placeholder={`Actuel: ${maxData.PEx_B3 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_MS1" width="30%" >PEx_MS1</FormLabel>
                <Input id="PEx_MS1" name="PEx_MS1" type="number" placeholder={`Actuel: ${maxData.PEx_MS1 || 'Non défini'}`}  onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_MS2_Cyber" width="30%" >PEx_MS2_Cyber</FormLabel>
                <Input id="PEx_MS2_Cyber" name="PEx_MS2_Cyber" type="number" placeholder={`Actuel: ${maxData.PEx_MS2_Cyber || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="PEx_MS2_Optionnelle" width="30%" >PEx_MS2_Optionnelle</FormLabel>
                <Input id="PEx_MS2_Optionnelle" name="PEx_MS2_Optionnelle" type="number" placeholder={`Actuel: ${maxData.PEx_MS2_Optionnelle || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Flex direction={["column", "column", "row"]} width="100%" justifyContent="space-between" alignItems="center" > 
                <FormLabel textAlign="center" htmlFor="Autres" width="30%" >Autres</FormLabel>
                <Input id="Autres" name="Autres" type="number" placeholder={`Actuel: ${maxData.Autres || 'Non défini'}`} onChange={handleChange} width="70%" />
            </Flex>
            <Button type="submit" colorScheme="blue" width="50%">Sauvegarder</Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};



export default AdminMaxForm;
