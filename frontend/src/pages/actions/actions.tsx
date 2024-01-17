import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import UserActions from '../../components/userActions';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";

const Actions: React.FC = () => {
    return (


      <Flex
        direction="column"
        minHeight="100vh" // Ensure the minimum height of the entire page is the full viewport height
      >
        <Header />

        <Flex
          direction="column"
          // flexGrow={1} // Allows this part to grow and take up available space
          flex="1"
          overflowY="auto" // Makes the content scrollable if it overflows
          paddingBottom="250px"
        >
          <UserActions />
        </Flex>

        <Footer />
      </Flex>

    );
  };
  
  export default Actions;