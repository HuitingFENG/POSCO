import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaMobileAlt, FaPhone, FaComment, FaEnvelope, FaRegCommentDots } from "react-icons/fa";
import { AiOutlineCopyright, AiOutlineMail } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";

const Footer = () => {

  return (
    <Flex p={10} align="center" justify="space-between" bg="#0C2340" as="footer" position="fixed" bottom="0" width="100%" left="0">
        <Flex justify="space-between"  align="center" flexDirection="column" gap={4}>
            <a href="https://www.efrei.fr" target="_blank" rel="noopener noreferrer"><Image src="../../../assets/efrei.png" alt="efrei.png" w="150px" /></a>
            <Flex align="center" justify="center">
                <Icon as={AiOutlineCopyright} boxSize={4} mr={2} color="white" />
                <Text fontWeight="bold" fontSize="xl" color="white">2024</Text>
            </Flex>
        </Flex>

        <Flex justify="space-between" align="center" flexDirection="column" gap={3}>
          <Flex align="center"><Icon as={FaRegCommentDots} boxSize={8} mr={4} color="white" /><Text fontWeight="bold" fontSize="2xl" color="white" >Contactez-nous :</Text></Flex>
          <Flex align="center"><Icon as={AiOutlineMail} boxSize={4} mr={2} color="white" /><Text fontWeight="bold" fontSize="md" color="white">Email : posco@efrei.fr </Text></Flex>
          <Flex align="center"><Icon as={FaPhone} boxSize={4} mr={2} color="white" /><Text fontWeight="bold" fontSize="md" color="white">Téléphone : +33 123 456 789</Text></Flex>
        </Flex>

        <Flex justify="space-between" flexDirection="column" gap={3}>
          <Flex align="center"><Icon as={GiEarthAmerica} boxSize={6} mr={2} color="white" /><Text fontWeight="bold" fontSize="2xl" color="white">Allez plus loin :</Text></Flex>
          <Flex align="center"><Icon as={FiLink} boxSize={6} mr={2} color="white" /><a href="https://nosgestesclimat.fr" target="_blank" rel="noopener noreferrer"><Text fontWeight="bold" fontSize="md" color="white">Nos Gestes Climat - ADEME</Text></a></Flex>
          <Flex align="center"><Icon as={FiLink} boxSize={6} mr={2} color="white" /><a href="https://www.myclimate.org/fr-ch/" target="_blank" rel="noopener noreferrer"><Text fontWeight="bold" fontSize="md" color="white">MyClimate - Shape your future</Text></a></Flex>
          <Flex align="center"><Icon as={FiLink} boxSize={6} mr={2} color="white" /><a href="https://offset.climateneutralnow.org/footprintcalc" target="_blank" rel="noopener noreferrer"><Text fontWeight="bold" fontSize="md" color="white">United Nations - Plate forme de compensation carbone</Text></a></Flex>
        </Flex>
    </Flex>

  );
};

export default Footer;