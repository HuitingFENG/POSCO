import React, { useEffect, useState } from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon, Table, Thead, Tbody, Tr, Th, Td, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

interface EmissionData {
  code: string;
  location: string;
  Train: number;
  Bus: number;
  Avion: number;
  Voiture: number;
  overMax: boolean;
}

const ReferencesData = () => {
  const [countryEmissions, setCountryEmissions] = useState<EmissionData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/references/")
      .then(response => response.json())
      .then((data) => {
        const sortedData = data.sort((a: { location: string; }, b: { location: string; }) => a.location.localeCompare(b.location));
        setCountryEmissions(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  const handleSearch = (term: React.SetStateAction<string>) => {
    setSearchTerm(term);
  };

  const filteredEmissions = countryEmissions.filter(emission =>
    emission.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Flex height="2500px" p={10} align="center" justify="space-between" flexDirection="column" gap={10}>
        <Flex flexDirection="column" gap={10} p={10} mt={4} > 
          <Flex flexDirection="column" gap={5} align="center" justify="space-around" >
            <Text fontWeight="bold" fontSize="4xl" color="black">Références du Calculateur</Text>
            <Flex width="80%" gap={10} justify="space-between" align="center">
              <FaSearch size={24} color="grey" onClick={() => handleSearch(searchTerm)} />
              <Input 
                placeholder="Chercher par la destination..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Flex>
          </Flex>


          <Flex>
            <Box overflowX="auto" overflowY="auto" maxH="1800px" w="100%">
              <Table variant="simple" >
                <Thead bg="blue.500" >
                  <Tr>
                    <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }}>Destination</Th>
                    <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }}>Moyen de Transport</Th>
                    <Th isNumeric color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Empreinte Carbone (en kgCO2e/personne) - Un Aller</Th>
                  </Tr>
                </Thead> 
                <Tbody>
                  {filteredEmissions.map((emission, index) => {
                    const transportModes = Object.keys(emission).filter(key => key !== 'location' && key !== 'code' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && emission[key as keyof EmissionData] !== 0);
                    return transportModes.map((mode, modeIndex) => (
                      <Tr
                        key={emission.code + mode}
                        bg={index % 2 === 0 ? "gray.100" : "gray.200"} // Alternating row colors
                      >
                        {modeIndex === 0 && (
                          <Td textAlign="center" rowSpan={transportModes.length}>{emission.location}</Td>
                        )}
                        <Td textAlign="center" >{mode}</Td>
                        <Td isNumeric textAlign="center" >{emission[mode as keyof EmissionData]}</Td>
                      </Tr>
                    ));
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>


{/*           <Flex>
            <Box overflowX="auto" overflowY="auto" maxH="1800px" w="100%">
              <Table variant="simple" >
                <Thead bg="blue.500" >
                  <Tr>
                    <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }}>Destination</Th>
                    <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }}>Moyen de Transport</Th>
                    <Th isNumeric color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Empreinte Carbone (en kgCO2e/personne) - Un Aller</Th>
                  </Tr>
                </Thead> 
                <Tbody>
                  {countryEmissions.map((emission, index) => {
                    const transportModes = Object.keys(emission).filter(key => key !== 'location' && key !== 'code' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && emission[key as keyof EmissionData] !== 0);
                    return transportModes.map((mode, modeIndex) => (
                      <Tr
                        key={emission.code + mode}
                        bg={index % 2 === 0 ? "gray.100" : "gray.200"} // Alternating row colors
                      >
                        {modeIndex === 0 && (
                          <Td textAlign="center" rowSpan={transportModes.length}>{emission.location}</Td>
                        )}
                        <Td textAlign="center" >{mode}</Td>
                        <Td isNumeric textAlign="center" >{emission[mode as keyof EmissionData]}</Td>
                      </Tr>
                    ));
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex> */}


        </Flex>
    </Flex>
  );
};

export default ReferencesData;