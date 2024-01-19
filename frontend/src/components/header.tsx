import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaChartBar, FaRegLightbulb, FaUserPlus, FaSignInAlt } from "react-icons/fa";

const Header = () => {

  return (
    <Flex p={4} align="center" justify="space-between" bg="#0C2340">
        <Flex justify="space-between" gap={10} p={1}>
            <Link as={RouterLink} to="/"><Image src="../../../assets/icon.png" alt="icon.png" boxSize="100px" /></Link>
            <Flex align="center" justify="center">
                <Text fontWeight="bold" fontSize="2xl" color="white">POSCO</Text>
            </Flex>
        </Flex>

        <Flex justify="space-between" alignItems="center" gap={10} mr={4}>
            <Link as={RouterLink} to="/questionnaire"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaBook} boxSize={6} mr={2} color="white" />Questionnaire</Text></Link>
            <Link as={RouterLink} to="/references"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaChartBar} boxSize={6} mr={2} />Références</Text></Link>
            <Link as={RouterLink} to="/actions"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaRegLightbulb} boxSize={6} mr={2} />Actions</Text></Link>
            {/* <Link as={RouterLink} to="/signup"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaUserPlus} boxSize={6} mr={2} />S'inscrire</Text></Link> */}
            {/* <Link as={RouterLink} to="/login"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaSignInAlt} boxSize={6} mr={2} />Se Connecter</Text></Link> */}
            <Link as={RouterLink} to="/profil"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaUser} boxSize={6} mr={2} />Profil</Text></Link>
        </Flex>
    </Flex>
  );
};

export default Header;
