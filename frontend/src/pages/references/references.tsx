import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ReferencesData from '../../components/referencesData';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";

const References: React.FC = () => {
    return (
     /*  <>
      <main>
        <Header />
        <ReferencesData />
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
          <ReferencesData />
        </Flex>

        <Footer />
      </Flex>

    );
  };
  
  export default References;