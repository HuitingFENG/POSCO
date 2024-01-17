import React, { useState, useEffect } from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center, Icon, Table, Thead, Tbody, Tr, Th, Td, Heading, List,ListItem,ListIcon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaDatabase } from "react-icons/fa";
import { FaChartBar, FaChartPie, FaRegLightbulb, FaRegCommentDots, FaArrowRight } from 'react-icons/fa';
import { MdOutlineTrendingUp, MdOutlineTrendingDown, MdOutlineEdit } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { MdKeyboardArrowRight, MdCheckCircle } from 'react-icons/md';
import { useUser } from '../context/UserContext';


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

interface Conseil {
  id: number;
  type: string;
  options?: string[];
}

// Props type using the Conseil interface
type Props = {
  conseilsList: Conseil[];
};


const ConseilsDisplay: React.FC<Props> = ({ conseilsList }) => {
  return (
    <Box>
      {conseilsList.map((conseil, conseilIndex) => (
        <Box key={conseil.id} mb={10}>
          <Heading size="md" mb={4}> {/* Increased margin bottom for the Heading */}
            {`${conseilIndex + 1}. ${conseil.type}`}
          </Heading>
          {conseil.options && (
            <List spacing={4}>
              {conseil.options.map((option, optionIndex) => (
                <ListItem 
                  key={optionIndex} 
                  display="flex" 
                  alignItems="center"
                  mt={optionIndex === 0 ? 4 : 0} /* Increased top margin for the first ListItem */
                >
                  <MdCheckCircle color="green" style={{ marginRight: '8px' }} />
                  <Text>{`${conseilIndex + 1}.${optionIndex + 1} ${option}`}</Text>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ))}
    </Box>
  );
};




const UserActions= () => {
  const userContext = useUser(); 
  const userId = userContext?.user?.userId;
  const [emissions, setEmissions] = useState<Emission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [conseils, setConseils] = useState<Conseil[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/emissions/')
        .then(response => response.json())
        // .then(data => setEmissions(data))
        .then(data => {
          console.log("TEST data : ", data);
          // Filter out emissions with userId 999
          const filteredEmissions2 = data.filter((emission: { userId: number; }) => (emission.userId !== 999 ));
          setEmissions(filteredEmissions2);
          console.log("TEST filteredEmissions2 : ", filteredEmissions2);
          const filteredEmissions3 = filteredEmissions2.filter((emission: { userId: number; }) => (emission.userId !== 1 ));
          setEmissions(filteredEmissions3);
          console.log("TEST filteredEmissions3 : ", filteredEmissions3);
        })
        .catch(error => console.error('Error fetching emissions:', error));
      fetch(`http://localhost:3001/api/users/`)
        .then(response => response.json())
        .then(data => {
          console.log("TEST data : ", data);
          setUsers(data);
        })
        .catch(error => console.error('Error fetching users:', error));
      fetch(`http://localhost:3001/api/conseils/`)
        .then(response => response.json())
        .then(data => {
          console.log("TEST data : ", data);
          setConseils(data);
        })
        .catch(error => console.error('Error fetching conseils:', error));
  }, []);


  const getUserDetails = (userId: number) => {
    const user = users.find(user => user.userId === userId);
    return user ? { name: user.name, email: user.email } : { name: '', email: '' };
  };
  

  if (!userContext) {
    return <div>Loading...</div>; 
  }

  const { user } = userContext;


  if (!user) {
    // return <div>Aucun utilisateur connecté.</div>;
    return (
      <Flex p={10} alignItems="center" justifyContent="center" flexDirection="column"  gap={10}>
        <Text fontWeight="bold" fontSize="6xl" color="black">Agissons Ensemble</Text>
        <Flex flexDirection="column" gap={5} alignItems="center" justifyContent="center">
          <ConseilsDisplay conseilsList={conseils} />
        </Flex>
      </Flex>
    );
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
    <Flex p={10} alignItems="center" justifyContent="center" flexDirection="column"  gap={10}>

      {(userId != 1) ? (
        <>
          <Flex flexDirection="column" width="80%" gap={10} p={10} mt={4} > 
            <Flex flexDirection="column" gap={5} align="center" justify="space-around">
              <Text fontWeight="bold" fontSize="4xl" color="black">Actions Suggérées pour Vous</Text>
            </Flex>
            <Flex flexDirection="column" gap={5} alignItems="center" justifyContent="center">
              <Text fontWeight="bold" fontSize="2xl" >Action 1: ...</Text>
              <Text fontWeight="bold" fontSize="2xl">Action 2: ...</Text>
              <Text fontWeight="bold" fontSize="2xl">Action 3: ...</Text>
            </Flex>
            
          </Flex>
        </>
      ) : (
        <Flex flexDirection="column" width="80%" gap={10} p={10} mt={4} > 
          <Flex flexDirection="column" gap={5} align="center" justify="space-around">
            <Text fontWeight="bold" fontSize="4xl" color="black">List d'Emissions Carbons</Text>
          </Flex>
          <Flex>
            <Box overflowX="auto" overflowY="auto" maxH="1800px" w="100%">
              <Table variant="simple">
                <Thead bg="blue.500">
                    <Tr>
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >N°</Th>
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >User ID</Th>
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >User Name</Th>
                        <Th color="white" textAlign="center" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >User Email</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Total Emissions (Kg)</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Total Consummation Emissions (Kg)</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Total Country Emissions (Kg)</Th>
                        <Th color="white" textAlign="left" backgroundColor='blue.500' style={{ position: 'sticky', top: 0, backgroundColor: 'blue.500' }} >Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                  {emissions.map((emission, index) => {
                      const userDetails = getUserDetails(emission.userId);
                      return (
                        <Tr key={`${emission.userId}-${index}`} bg={index % 2 === 0 ? "gray.100" : "gray.200"}>
                          <Td textAlign="center">{index + 1}</Td>
                          <Td textAlign="center">{emission.userId}</Td>
                          {/* <Td textAlign="center">{user.userId == emission.userId ? user.name : ''}</Td>
                          <Td textAlign="left">{user.userId == emission.userId ? user.email : ''}</Td> */}
                          <Td textAlign="center">{userDetails.name}</Td>
                          <Td textAlign="left">{userDetails.email}</Td>
                          <Td textAlign="center">{emission.totalEmissions}</Td>
                          <Td textAlign="center">{emission.totalConsummationEmissions}</Td>
                          <Td textAlign="center">{emission.totalCountryEmissions}</Td>
                          <Td textAlign="left">{formatDate(emission.createdAt)}</Td>
                      </Tr>
                      ); 
                    })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Flex>
      )}
      

    </Flex>
  );
};

export default UserActions;