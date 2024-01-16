import React, { useState, useEffect }  from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useUser } from '../context/UserContext';

interface User {
  name: string;
  email: string;
}

const UserProfil = () => {
  const userContext = useUser(); // Get the entire context object

  // Check if the context is not null before trying to access 'user'
  if (!userContext) {
    return <div>Loading...</div>; // Or handle the null case as needed
  }

  const { user } = userContext;



  if (!user) {
    return <div>Aucun utilisateur connecté.</div>;
  }
/*   const [user, setUser] = useState<User | null>(null);
  const location = useLocation(); */

  /* useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name); 
      setUserEmail(user.email); 
    }
    }, []);
 */

/*   useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]); */

/* 
  useEffect(() => {
    console.log("Location State:", location.state);
    const userData = location.state?.user as User;
    if (userData) {
      setUser(userData);
    }
  }, [location]); */


  if (!user) {
    return <div>Aucun utilisateur connecté.</div>; 
  }

  return (
    <Flex p={10} align="center" justify="space-between" flexDirection="column" gap={20} m={10}>
          <Flex mb={10}>
            <Text fontWeight="bold" fontSize="4xl" color="black">Profil de l'Utilisateur</Text>
          </Flex>
          <Flex flexDirection="column" gap={5} align="center" justify="space-around" mb={10}>
            <Text fontWeight="bold" fontSize="2xl" color="black">Votre nom : {user.name}</Text>
            <Text fontWeight="bold" fontSize="2xl" color="black">Votre email : {user.email}</Text>
          </Flex>
          <Flex flexDirection="column" gap={5} align="center" justify="space-around">
            <Text fontWeight="bold" fontSize="3xl" color="black">Votre résultats historiques</Text>
            <Text fontWeight="bold" fontSize="2xl" color="black">Votre résultats historiques : score, datetime, questionnaires concernés </Text>
          </Flex>
    </Flex>
  );
};

export default UserProfil;