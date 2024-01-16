import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser } from "react-icons/fa";
import { FaChartBar, FaChartPie, FaRegLightbulb, FaRegCommentDots, FaArrowRight } from 'react-icons/fa';
import { MdOutlineTrendingUp, MdOutlineTrendingDown, MdOutlineEdit } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useUser } from '../context/UserContext';

interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
}


const UserActions= () => {
  const userContext = useUser(); 
  const userId = userContext?.user?.userId;

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
          <Text fontWeight="bold" fontSize="2xl" >Action 1: ...</Text>
          <Text fontWeight="bold" fontSize="2xl">Action 2: ...</Text>
          <Text fontWeight="bold" fontSize="2xl">Action 3: ...</Text>
        </Flex>
      </Flex>
    );
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
        </Flex>
      )}
      

    </Flex>
  );
};

export default UserActions;