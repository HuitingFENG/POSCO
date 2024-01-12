import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser } from "react-icons/fa";
import { FaChartBar, FaChartPie, FaRegLightbulb, FaRegCommentDots, FaArrowRight } from 'react-icons/fa';
import { MdOutlineTrendingUp, MdOutlineTrendingDown, MdOutlineEdit } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';

const Body = () => {
  return (
    <Flex p={10} align="center" justify="space-between" flexDirection="column" gap={10}>
        <Flex flexDirection="column" width="80%" gap={10} p={10} mt={4} > 
          <Flex flexDirection="column" gap={5} align="center" justify="space-around">
            <Text fontWeight="bold" fontSize="4xl" color="black">Le Calculateur d'Empreinte Carbone d'EFREI Paris</Text>
            <Text fontWeight="bold" fontSize="sm" color="black">Dotée d’un réseau largement ouvert sur le monde, notre école EFREI Paris a la capacité de rayonner sur l’ensemble des continents et de proposer des mobilités universitaires internationales dans 93 prestigieuses institutions partenaires dans 40 pays.</Text>
            <Text fontWeight="bold" fontSize="sm" color="black">La mobilité internationale est obligatoire dans le cadre du programme Ingénieur de l’Efrei. Les élèves ingénieur sous statut étudiant ont l’obligation d’effectuer deux périodes de mobilité à l’international, dont une période d’un semestre. Les élèves ingénieur en filière apprentissage doivent effectuer une mobilité à l’international.</Text>
            </Flex>
          <Flex  align="center" justify="space-between" flexDirection="row" mt={5} border="4px" borderColor="#0C2340" borderStyle="dashed" p={10}> 
            <Flex align="center" justify="space-between" flexDirection="column" >
              <Text fontWeight="bold" fontSize="2xl" color="black">Connaissez-vous votre empreinte carbon liée à la mobilité ?</Text>
              <Text fontWeight="bold" fontSize="sm" color="black">Remplir le questionnaire et découvrez comment réduire votre empreinte carbone sur le climat.</Text>
            </Flex>
             <Link as={RouterLink} to="/questionnaire"><Button size="md" height="48px" width={{ base: "100%", md: "200px" }} border="2px" borderColor="#0C2340" fontSize="md" justifyContent="space-between" >Calculer<Icon as={MdKeyboardArrowRight} color="#0C2340" w={10} h={8} /></Button></Link>
            {/* <Button size="md" height="48px" width={{ base: "100%", md: "200px" }} border="2px" borderColor="#0C2340" fontSize="md" justifyContent="space-between" >Partager<Icon as={FaArrowRight} color="#0C2340" w={4} h={4} /></Button> */}
          </Flex>
        </Flex>

        <Flex>
          <Box width="1000px" height="480px" boxShadow="lg">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=14Srngj75VBAmMrIY6QAcIOuo2laUwLJc&ehbc=2E312F"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </Box>
        </Flex>
    </Flex>
  );
};

export default Body;