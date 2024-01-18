import React, { useState, useEffect }  from "react";
import { Box,Flex,Text,Image,Button,Stack,Center,Icon, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaEdit, FaBookReader } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useUser } from '../context/UserContext';
import LogoutButton from './logout'; 
import { useTempId } from '../context/TempIdContext';

interface User {
  userId: number;
  tempId: string;
  name: string;
  email: string;
  password: string;
}

interface Question {
  id: number;
  question_text: string;
}

interface Emission {
  userId: number;
  responsesList: number[]; 
  totalEmissions: number;
  totalConsummationEmissions: number;
  totalCountryEmissions: number;
  createdAt: string; 
}

interface Response {
  createdAt: string | number | Date;
  id: number;
  userId: number;
  questionId: number;
  answer: string;
  question: Question; 
}


const UserProfil = () => {

  const userContext = useUser(); 
  const userId = userContext?.user?.userId;
  const clearTempId = () => setTempId(null);

  const { tempId, setTempId } = useTempId();

  const [emissions, setEmissions] = useState<Emission[]>([]);
  const [responses, setResponses] = useState<Response[]>([]); 

  useEffect(() => {
      fetch(`http://localhost:3001/api/emissions/user/${userId}`) 
          .then(response => response.json())
          // .then(data => setEmissions(data))
          .then(data => {
            // Sort data by date in descending order
            const sortedData = data.sort((a: Emission, b: Emission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setEmissions(sortedData);
          })
          .catch(error => console.error('Error:', error));
      fetch(`http://localhost:3001/api/responses/user/${userId}`)
          .then(response => response.json())
          // .then(data => setResponses(data))
          .then(data => {
            // Sort data by date in descending order
            const sortedResponses = data.sort((a: Response, b: Response)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setResponses(sortedResponses);
          })
          .catch(error => console.error('Error fetching responses:', error));
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


  const modifyQuestion = () => {
    console.log("TEST modifyQuestion : ");
  }

  return (
    <Flex height="2000px" p={10} align="center" justify="space-between" flexDirection="column" m={10}>

          <Flex flex="1" m={10} width="80%" bgColor="#dddddd" border="4px" borderColor="#0C2340" borderStyle="dashed" p= {10} flexDirection="column" alignItems="center" justifyContent="center" gap={3}>
            <Text fontWeight="bold" fontSize="4xl" color="black" mb={5}>Profil de l'Utilisateur</Text>
            <Text fontWeight="bold" fontSize="2xl" color="black">Votre nom : {user.name}</Text>
            <Text fontWeight="bold" fontSize="2xl" color="black">Votre email : {user.email}</Text>
            
            <Flex flexDirection="row" align="center" justify="space-between" gap={10} pt={10}>
              <LogoutButton /> 
                {(userId != 1) ? (
                <>
                  <Button bgColor="#003153" color="white" width="500px" height="60px" fontSize="xl" p={6} gap={3}>
                    <div style={{ border: '1px solid white', borderRadius: '10%', display: 'inline-block', padding: '5px', backgroundColor:"white"}}>
                      <FaBookReader size={24} color="green" />
                    </div>
                    <Link to="/actions">
                      Lire actions suggérées pour moi
                    </Link>
                  </Button>
                </>
              ) : (
                <Text></Text>
              )}  
            </Flex>
            
            
           
          </Flex>

          {(userId != 1) ? (
            <>
              <Flex flex="3" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                <Text fontWeight="bold" fontSize="3xl" color="black">Votre Résultats du Questionnaire Historiques </Text>
                <Box overflowX="auto" overflowY="auto" maxH="400px" w="100%">
                  <Table variant="simple">
                    <Thead bg="blue.500" >
                      <Tr >
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >N°</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Total Emissions (kg)</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Total Consummation Emissions (kg)</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Total Country Emissions (kg)</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Date Envoyée</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {emissions.map((emission, index) => (
                        <Tr key={`${emission.userId}-${index}`} bg={index % 2 === 0 ? "gray.100" : "gray.200"}>
                          <Td textAlign="center">{index + 1}</Td>
                          <Td textAlign="center">{emission.totalEmissions}</Td>
                          <Td textAlign="center">{emission.totalConsummationEmissions}</Td>
                          <Td textAlign="center">{emission.totalCountryEmissions}</Td>
                          <Td textAlign="left">{formatDate(emission.createdAt)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Flex>
            

              <Flex flex="5" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                <Text fontWeight="bold" fontSize="3xl" color="black">Vos Réponses Historiques</Text>
                <Box overflowX="auto" overflowY="auto" maxH="600px" w="100%">
                  <Table variant="simple">
                    <Thead bg="blue.500">
                      <Tr>
                       
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >N°</Th>
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Question</Th>
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Réponse</Th>
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Date Envoyée</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {responses.map((response, index) => (
                        <Tr key={response.id} bg={index % 2 === 0 ? "gray.100" : "gray.200"}>
                          <Td textAlign="center">{index + 1}</Td>
                          <Td textAlign="left">{response.question.question_text}</Td>
                          <Td textAlign="center">{response.answer}</Td>
                          <Td textAlign="left">{formatDate(response.createdAt)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Flex>
            </>

          ) : (

            <Flex flex="3" gap={10}>
              <Button bgColor="#003153" color="white" width="500px" height="60px" fontSize="xl" p={6} gap={3} onClick={() => modifyQuestion()}>
                <div style={{ border: '1px solid white', borderRadius: '10%', display: 'inline-block', padding: '5px', backgroundColor:"white"}}>
                <FaEdit size={24} color="blue" />
                </div>
                Modifier le nombre MaxEmissionCarbon 
              </Button>
              
                <Button bgColor="#003153" color="white" width="500px" height="60px" fontSize="xl" p={6} gap={3}>
                  <div style={{ border: '1px solid white', borderRadius: '10%', display: 'inline-block', padding: '5px', backgroundColor:"white"}}>
                    <FaBookReader size={24} color="green" />
                  </div>
                  <Link to="/actions">
                    Parcourir les lists d'émissions carbons
                  </Link>
                </Button>
            </Flex>
          )};

          
    </Flex>
  );
};


export default UserProfil;