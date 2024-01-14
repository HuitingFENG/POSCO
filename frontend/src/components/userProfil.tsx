import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser } from "react-icons/fa";



const UserProfil = () => {
  return (
    <Flex /* height="2000px" */ p={10} align="center" justify="space-between" flexDirection="column" gap={10}>
        <Flex flexDirection="column" width="80%" gap={10} p={10} mt={4} > 
          <Flex flexDirection="column" gap={5} align="center" justify="space-around">
            <Text fontWeight="bold" fontSize="4xl" color="black">Profil de l'Utilisateur</Text>
          </Flex>
          <Flex>

          </Flex>
        </Flex>
    </Flex>
  );
};

export default UserProfil;