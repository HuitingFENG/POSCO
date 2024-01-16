import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import UserActions from '../../components/userActions';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";

const Actions: React.FC = () => {
    return (
      <>
      <main>
        <Header />
        <UserActions />
      </main><Footer />
      </>
    );
  };
  
  export default Actions;