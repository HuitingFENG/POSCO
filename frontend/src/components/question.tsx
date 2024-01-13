import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,Input } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

interface Question {
    question_text: string;
}

const Question = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<string[]>([]);

    const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newResponses = [...responses];
        newResponses[currentQuestionIndex] = event.target.value;
        setResponses(newResponses);
    };

    const sendResponses = () => {
        fetch('http://localhost:3001/api/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responses }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };


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
            <Flex flex="2" m={10} width="80%" bgColor="#dddddd" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                <Flex>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Questionnaire</Text>
                </Flex>
                <Flex>
                    {/* <ul>
                        {questions.map((question, index) => (
                            <li key={index}>{question.question_text}</li>
                        ))}
                    </ul> */}
                    {/* Question:  */}
                    <Text fontWeight="bold" fontSize="xl">{questions[currentQuestionIndex]?.question_text}</Text>
                </Flex>
                <Flex>
                    <Input border="2px" borderColor="gray"
                        value={responses[currentQuestionIndex] || ''} 
                        onChange={handleResponseChange} 
                    />
                </Flex>
                <Flex gap={10}>
                    
                    {currentQuestionIndex < questions.length - 1 ? (
                        <>{/* <Button width="100px"
                            onClick={() => setCurrentQuestionIndex(prevIndex => prevIndex - 1)}
                            disabled={currentQuestionIndex >= questions.length + 1}
                        >
                            Prédédent
                        </Button> */}
                        <Button
                            width="100px"
                            onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0))}
                            disabled={currentQuestionIndex === 0}
                            >
                            Précédent
                        </Button>

                        <Button width="100px" onClick={() => setCurrentQuestionIndex(prevIndex => prevIndex + 1)}>
                                Suivant
                            </Button></>
                    ) : (
                        <Button width="100px" onClick={sendResponses}>
                            Envoyer
                        </Button>
                    )}
                </Flex>
            </Flex>

            <Flex flex="3" border="2px" borderColor="black" p={10} bgColor="skyblue">
                Vos Réponses :
                
            </Flex>
        </Flex>
    );
};

export default Question;