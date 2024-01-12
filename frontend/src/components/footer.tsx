import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaMobileAlt, FaPhone, FaComment, FaEnvelope } from "react-icons/fa";
import { AiOutlineCopyright, AiOutlineMail } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";

const Footer = () => {

  return (
    <Flex p={10} align="center" justify="space-between" bg="#0C2340">
        <Flex justify="space-between"  align="center" flexDirection="column" gap={4}>
            <Link as={RouterLink} to="/"><Image src="../../../assets/efrei.png" alt="efrei.png" w="150px" /></Link>
            <Flex align="center" justify="center">
                <Text fontWeight="bold" fontSize="xl" color="white"><Icon as={AiOutlineCopyright} boxSize={4} mr={2} />2024</Text>
            </Flex>
        </Flex>

        <Flex justify="space-between" align="center" flexDirection="column" gap={3}>
          <Text fontWeight="bold" fontSize="2xl" color="white" pb={3}><Icon as={FaComment} boxSize={8} mr={4} />Contactez-nous :</Text>
          <Text fontWeight="bold" fontSize="md" color="white"><Icon as={AiOutlineMail} boxSize={4} mr={2} />Email : projet.posco@efrei.net </Text>
          <Text fontWeight="bold" fontSize="md" color="white"><Icon as={FaPhone} boxSize={4} mr={2} />Téléphone : +01 23 45 67 89</Text>
        </Flex>

        <Flex justify="space-between" flexDirection="column" gap={3}>
            <Text fontWeight="bold" fontSize="2xl" color="white" pb={3}><Icon as={GiEarthAmerica} boxSize={6} mr={2} color="white" />Allez plus loin :</Text>
            <a href="https://nosgestesclimat.fr" target="_blank" rel="noopener noreferrer"><Text fontWeight="bold" fontSize="md" color="white"><Icon as={FiLink} boxSize={6} mr={2} />Nos Gestes Climat - ADEME</Text></a>
            <a href="https://www.myclimate.org/fr-ch/" target="_blank" rel="noopener noreferrer"><Text fontWeight="bold" fontSize="md" color="white"><Icon as={FiLink} boxSize={6} mr={2} />MyClimate - Shape your future</Text></a>
            <a href="https://offset.climateneutralnow.org/footprintcalc" target="_blank" rel="noopener noreferrer"><Text fontWeight="bold" fontSize="md" color="white"><Icon as={FiLink} boxSize={6} mr={2} />United Nations - Plate forme de compensation carbone</Text></a>
        </Flex>
    </Flex>
  );
};

export default Footer;