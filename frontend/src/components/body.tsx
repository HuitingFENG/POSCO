import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser } from "react-icons/fa";

const Body = () => {
  return (
    <Flex p={4} align="center" justify="space-between" bg="#dddddd" pb="10">
        Body
    </Flex>
  );
};

export default Body;