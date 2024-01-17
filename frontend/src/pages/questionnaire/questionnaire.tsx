import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Question from '../../components/question';
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";

const Questionnaire: React.FC = () => {
    return (
/*       <>
      <main>
        <Header />
        <Question />
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
          <Question />
        </Flex>

        <Footer />
      </Flex>

    );
  };
  
  export default Questionnaire;