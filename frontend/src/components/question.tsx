import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,Input } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

interface Question {
    id: number;
    question_text: string;
}

const Question = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<string[]>([]);
    const [submissionComplete, setSubmissionComplete] = useState(false);

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

    const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newResponses = [...responses];
        newResponses[currentQuestionIndex] = event.target.value;
        setResponses(newResponses);
    };

    const sendResponses = () => {
        const formattedResponses = responses.map((answer, index) => ({
            userId: 1, // Replace with actual user ID
            questionId: questions[index].id, // Replace with the question ID
            answer: answer
        }));

        fetch('http://localhost:3001/api/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responses: formattedResponses }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Sending formatted responses:", formattedResponses);
          console.log('Success:', data);
          setResponses([]);
          setSubmissionComplete(true);
          setCurrentQuestionIndex(0);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const isQuestionAvailable = questions.length > 0 && questions[currentQuestionIndex];

    return (
        <Flex justify="space-between" align="center" flexDirection="column" gap={10}>
            {isQuestionAvailable && (
                <Flex flex="2" m={10} width="80%" bgColor="#dddddd" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Questionnaire</Text>
                    <Text fontWeight="bold" fontSize="xl"> {currentQuestionIndex+1}. {questions[currentQuestionIndex]?.question_text}</Text>
                    <Input border="2px" borderColor="gray"
                        value={responses[currentQuestionIndex] || ''} 
                        onChange={handleResponseChange} 
                    />

                    <Flex gap={10}>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <>
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
            )}

            {submissionComplete &&(
                <Flex flex="3" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Votre résultat : 150 kg </Text>
                    <Text fontWeight="bold" fontSize="xl" color="black" textAlign="center">Merci de nous avoir envoyer vos réponses !</Text>
                </Flex>
            )}
        </Flex>
    );
};

export default Question;