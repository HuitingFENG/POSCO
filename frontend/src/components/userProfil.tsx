import React, { useState, useEffect }  from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useUser } from '../context/UserContext';
import LogoutButton from './logout'; 

interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
}


interface Emission {
  userId: number;
  responsesList: number[]; 
  totalEmissions: number;
  totalConsummationEmissions: number;
  totalCountryEmissions: number;
  createdAt: string; 
}



const UserProfil = () => {
  const userContext = useUser(); 
  const userId = userContext?.user?.userId;

  const [emissions, setEmissions] = useState<Emission[]>([]);

  useEffect(() => {
      fetch(`http://localhost:3001/api/emissions/user/${userId}`) 
          .then(response => response.json())
          .then(data => setEmissions(data))
          .catch(error => console.error('Error:', error));
  }, [userId]);

  if (!userContext) {
    return <div>Loading...</div>; 
  }

  const { user } = userContext;

  if (!user) {
    return <div>Aucun utilisateur connecté.</div>;
  }

  


  function formatDate(isoString: string | number | Date) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }



  return (
    <Flex p={10} align="center" justify="space-between" flexDirection="column" m={10}>
          <Flex flex="2" m={10} width="80%" bgColor="#dddddd" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={5}>
            <Text fontWeight="bold" fontSize="4xl" color="black" mb={5}>Profil de l'Utilisateur</Text>
            <Text fontWeight="bold" fontSize="2xl" color="black">Votre nom : {user.name}</Text>
            <Text fontWeight="bold" fontSize="2xl" color="black">Votre email : {user.email}</Text>
            <LogoutButton /> 
          </Flex>
          <Flex flex="3" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
            <Text fontWeight="bold" fontSize="3xl" color="black">Votre Résultats Historiques</Text>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="blue.500" >
                  <Tr >
                    <Th color="white" textAlign="center">N°</Th>
                    <Th color="white" textAlign="center">Total Emissions (kg)</Th>
                    <Th color="white" textAlign="center">Total Consummation Emissions (kg)</Th>
                    <Th color="white" textAlign="center">Total Country Emissions (kg)</Th>
                    <Th color="white" textAlign="center">Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {emissions.map((emission, index) => (
                    <Tr key={`${emission.userId}-${index}`} bg={index % 2 === 0 ? "gray.100" : "gray.200"}>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td textAlign="center">{emission.totalEmissions}</Td>
                      <Td textAlign="center">{emission.totalConsummationEmissions}</Td>
                      <Td textAlign="center">{emission.totalCountryEmissions}</Td>
                      <Td textAlign="center">{formatDate(emission.createdAt)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
    </Flex>
  );
};


export default UserProfil;