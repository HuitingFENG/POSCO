import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

interface Question {
    question_text: string;
    // ... other properties ...
}

const Question = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/questions')
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Flex justify="space-between" align="center" flexDirection="column" gap={10}>
            <Flex flex="2" border="2px" borderColor="black" p={10} bgColor="tomato">
                Question1 : Distance
            </Flex>

            <Flex flex="3" border="2px" borderColor="black" p={10} bgColor="skyblue">
                Vos Réponses :
                <div>
                    <h1>Questions</h1>
                    <ul>
                        {questions.map((question, index) => (
                        <li key={index}>{question.question_text}</li>
                        ))}
                    </ul>
                </div>
            </Flex>
        </Flex>
    );
};

export default Question;