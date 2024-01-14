import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Signup from '../../components/signup';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,Input } from "@chakra-ui/react";

const Sinscrire: React.FC = () => {
    return (
      <>
      <main>
        <Header />
        <Flex gap={20} flexDirection="column" justify="space-between" align="center" mt={20}>
          <Text fontWeight="bold" fontSize="4xl">S'inscrire</Text>
          <Signup />
        </Flex>
        
        
      </main><Footer />
      </>
    );
  };
  
  export default Sinscrire; 