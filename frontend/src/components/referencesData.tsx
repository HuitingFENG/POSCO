import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
// const { countryEmissions } = require('../../backend/data/mockData');
// import { countryEmissions } from '../../backend/data/mockData';

interface EmissionData {
  code: string;
  location: string;
  Train: number;
  Bus: number;
  Avion: number;
  Voiture: number;
}

const ReferencesData = () => {
  const countryEmissions: EmissionData[] = [
    {code:"stokeontrent", location:"Stoke-on-Trent, Angleterre", Train: 4.4, Bus: 22, Avion: 129, Voiture:159},
    {code:"pologne", location:"Cravovie, Pologne", Train: 10, Bus: 46, Avion: 229, Voiture: 338 },
    {code:"hongrie", location:"Budapest, Hongrie", Train: 10, Bus: 44, Avion: 224, Voiture: 326 },
    {code:"tcheque", location:"Ostrava, République Tchèque", Train: 8, Bus: 41, Avion: 207, Voiture: 306 },
    {code:"montreal", location:"Montréal, Canada", Train: 0, Bus: 0, Avion: 835, Voiture: 0 },
    {code:"malaisie", location:"Kuala Lumpur, Malaisie", Train: 0, Bus: 0, Avion: 1581, Voiture: 0 },
    {code:"afrique", location:"Le Cap, Afrique du Sud", Train: 0, Bus: 0, Avion: 2767, Voiture: 0 },
    {code:"toronto", location:"Toronto, Canada", Train: 0, Bus: 0, Avion: 910, Voiture: 0 },
    {code:"etatsunis", location:"Irvine, Etats-Unis", Train: 0, Bus: 0, Avion: 1380, Voiture: 0 },
    {code:"portsmouth", location:"Portsmouth, Angleterre", Train: 3.7, Bus: 17, Avion: 76, Voiture: 122 },
    {code:"tallinn", location:"Tallinn, Estonie", Train: 16, Bus: 75, Avion: 332, Voiture: 557 },
    {code:"vilnius", location:"Vilnius, Lituanie", Train: 13, Bus: 62, Avion: 303, Voiture: 456 },
    {code:"espagne", location:"Malaga, Espagne", Train: 11, Bus: 53, Avion: 260, Voiture: 391 },
  ];

  const CountryEmissions: EmissionData[] = countryEmissions;

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
                    const transportModes = Object.keys(emission).filter(key => key !== 'location' && key !== 'code' && emission[key as keyof EmissionData] !== 0);

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