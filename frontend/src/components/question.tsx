import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";

const Question = () => {
    return (
        <Flex justify="space-between" align="center" flexDirection="column" gap={10}>
            <Flex flex="2" border="2px" borderColor="black" p={10} bgColor="tomato">
                Question1 : Distance
            </Flex>

            <Flex flex="3" border="2px" borderColor="black" p={10} bgColor="skyblue">
                Vos Réponses :
            </Flex>
        </Flex>
    );
};

export default Question;