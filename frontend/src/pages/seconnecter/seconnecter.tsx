import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Login from '../../components/login';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,Input } from "@chakra-ui/react";

const Seconnecter: React.FC = () => {
    return (
/*       <>
      <main>
        <Header />
        <Flex gap={20} flexDirection="column" justify="space-between" align="center" mt={20}>
          <Text fontWeight="bold" fontSize="4xl">Se Connecter</Text>
          <Login />
        </Flex>
        
      </main><Footer />
      </> */

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
          <Flex gap={20} flexDirection="column" justify="space-between" align="center" mt={20}>
            <Text fontWeight="bold" fontSize="4xl">Se Connecter</Text>
            <Login />
          </Flex>
        </Flex>

        <Footer />
      </Flex>


    );
  };
  
  export default Seconnecter;