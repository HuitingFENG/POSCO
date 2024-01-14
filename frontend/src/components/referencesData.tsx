import React, { useEffect, useState } from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";

interface EmissionData {
  code: string;
  location: string;
  Train: number;
  Bus: number;
  Avion: number;
  Voiture: number;
}

const ReferencesData = () => {
  const [countryEmissions, setCountryEmissions] = useState<EmissionData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/references/")
      .then(response => response.json())
      .then((data) => {

        setCountryEmissions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); 
  

  return (
    <Flex height="2800px" p={10} align="center" justify="space-between" flexDirection="column" gap={10}>
        <Flex flexDirection="column" width="80%" gap={10} p={10} mt={4} > 
          <Flex flexDirection="column" gap={5} align="center" justify="space-around" mb={5}>
            <Text fontWeight="bold" fontSize="4xl" color="black">Références du Calculateur</Text>
          </Flex>

          <Flex>
            <Box overflowX="auto">
              <Table variant="simple" /* fontWeight="bold"  */align="center">
                <Thead>
                  <Tr>
                    <Th>Destination</Th>
                    <Th>Moyen de Transport</Th>
                    <Th isNumeric>Empreinte Carbone (en kgCO2e/personne) - Un Aller</Th>
                  </Tr>
                </Thead> 
                <Tbody>
                  {countryEmissions.map((emission, index) => {
                    const transportModes = Object.keys(emission).filter(key => key !== 'location' && key !== 'code' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && emission[key as keyof EmissionData] !== 0);

                    /* return transportModes.map((mode) => (
                      <Tr key={emission.code + mode}>
                        {transportModes.indexOf(mode) === 0 && (
                          <Td rowSpan={transportModes.length}>{emission.location}</Td>
                        )}
                        <Td>{mode}</Td>
                        <Td isNumeric>{emission[mode as keyof EmissionData]}</Td>
                      </Tr>
                    )); */
                    
                    return transportModes.map((mode, modeIndex) => (
                      <Tr
                        key={emission.code + mode}
                        bg={index % 2 === 0 ? "gray.100" : "gray.200"} // Alternating row colors
                      >
                        {modeIndex === 0 && (
                          <Td align="center" rowSpan={transportModes.length}>{emission.location}</Td>
                        )}
                        <Td align="center">{mode}</Td>
                        <Td isNumeric align="center" >{emission[mode as keyof EmissionData]}</Td>
                      </Tr>
                    ));

                  })}

                </Tbody>
              </Table>
            </Box>
          </Flex>

        </Flex>
    </Flex>
  );
};

export default ReferencesData;