import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import UserProfil from '../../components/userProfil';
import Signup from '../../components/signup';
import Login from '../../components/login';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,Input } from "@chakra-ui/react";

const Profil: React.FC = () => {
    return (
      <>
      <main>
        <Header />
        <UserProfil />
{/*         <Flex gap={20} flexDirection="column" justify="space-between" align="center">
          <Signup />
          <Login />
        </Flex> */}
        
      </main><Footer />
      </>
    );
  };
  
  export default Profil;