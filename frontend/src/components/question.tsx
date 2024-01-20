import { Box,Flex,Text,Image,Button,Stack,Center,Icon,Input,Progress } from "@chakra-ui/react";
import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { FaArrowLeft, FaArrowRight, FaPaperPlane, FaShareAlt } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { useTempId } from "../context/TempIdContext";
import { PartagerContext } from '../context/PartagerContext';
import ResponseVisualization from './responseVisualization';

interface Question {
    id: number;
    question_text: string;
    type: string;
    options?: string[];
}

interface Emission {
    totalCountryEmissions: ReactNode;
    calculation: ReactNode;
    totalConsummationEmissions: ReactNode;
    id: number;
    userId: number;
    responsesList: number[];
    totalEmissions: string;
    createdAt: string;
    updatedAt: string;
    tempId: string;
    overMax: boolean;
}

const Question = () => {
    const userContext = useUser();
    const navigate = useNavigate();
    const userId = userContext?.user?.userId;
    const { tempId: contextTempId, setTempId } = useTempId();
    const location = useLocation();
    const { tempId: navigatedTempId } = location.state || {};
    const tempIdToUse = navigatedTempId || contextTempId;
    const [isPartagerClicked, setIsPartagerClicked] = useState(false);
    const { fromPartager, setFromPartager } = useContext(PartagerContext);
    const currentYear = new Date().getFullYear();


    useEffect(() => {
        setResponses([]);
        setCurrentQuestionIndex(0);
        setSubmissionComplete(false);
        setSelectedOptions({});
        setTotalEmission(0);
        setTotalConsummationEmissions(0);
        setTotalCountryEmissions(0);
        setDisplayResponsesCalculation(false);

        setIsLoading(true);
        fetch('http://localhost:3001/api/questions')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a: {id: number; }, b: {id: number; }) => a.id - b.id);
                setQuestions(sortedData);
                if (!userId) {
                    setTempId(uuidv4());
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [userId]); 


    const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<string[]>([]);
    const [tempResponses, setTempResponses] = useState<string[]>([]);
    const [responsesCalculation, setResponsesCalculation] = useState<Emission[]>([]);
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const [closeQuestionnaire, setCloseQuestionnaire] = useState(false);
    // const [retakeTest, setRetakeTest] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [maxPromotion, setMaxPromotion] = useState<string[]>([]);
    const [promotion, setPromotion] = useState('');
    const [totalEmission, setTotalEmission] = useState(0);
    const [totalConsummationEmissions, setTotalConsummationEmissions] = useState(0);
    const [totalCountryEmissions, setTotalCountryEmissions] = useState(0);
    const [overMax, setOverMax] = useState(false);
    const maxValue = 100
    const minValue = 0
    const stepValue = 1
    const [displayResponsesCalculation, setDisplayResponsesCalculation] = useState(false);
    const [tempFormattedResponses, setTempFormattedResponses] = useState([]);
    const [maxCarbonByPromotion, setMaxCarbonByPromotion] = useState(0);

    const [totalQuestionsToAnswer, setTotalQuestionsToAnswer] = useState(questions.length);
  
    useEffect(() => {
        if (responses.length > 0) {
            const newPromotion = responses[0];
            setPromotion(newPromotion);
        }
    }, [responses]);

    useEffect(() => {
        if (promotion) {
            fetch(`http://localhost:3001/api/maxs/years/${currentYear}`)
                .then(response => response.json())
                .then(data => {
                    const sortedData = data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
                    const highestIdData = sortedData[0];
                    const maxCarbonByPromotion = highestIdData[promotion];
                    setMaxCarbonByPromotion(maxCarbonByPromotion);
                    console.log("TEST setMaxCarbonByPromotion(maxCarbonByPromotion): ", maxCarbonByPromotion);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    }, [promotion, currentYear]);


    useEffect(() => {
        if (responses[questions.length - 3] === 'Non') {
            setTotalQuestionsToAnswer(questions.length - 2);
        } else {
            setTotalQuestionsToAnswer(questions.length);
        }
    }, [responses, questions.length]);


    useEffect(() => {
        if (navigatedTempId) {
            setTempId(navigatedTempId);
        } else if (!contextTempId) {
            setTempId(uuidv4());
        }
    }, [navigatedTempId, contextTempId, setTempId]);

    const handleOptionClick = (questionId: number, option: string) => {
        handleResponseChange({ target: { value: option } } as React.ChangeEvent<HTMLInputElement>);
        setSelectedOptions(prev => ({ ...prev, [questionId]: option }));
    };

    const renderInputField = (question: Question) => {
        const selectedOption = selectedOptions[question.id];

        switch (question.type) {
          case 'text':
            return (
                <Flex >
                    {question.options?.map((option, idx) => (
                        <Button 
                            key={idx}
                            onClick={() => handleOptionClick(question.id, option)}
                            style={{ 
                                margin: '5px',
                                backgroundColor: selectedOption === option ? '#4682B4' : 'white', 
                                color: selectedOption === option ? 'white' : 'black'
                            }}
                        >
                            {option}
                        </Button>
                    ))}
                </Flex>
            );
          case 'number':
            return  <Input width="250px" type="number" value={responses[currentQuestionIndex] || ''} onChange={handleResponseChange} min={minValue} max={maxValue} step={stepValue} isInvalid={inputError} /> 
          case 'mcq':
            return (
              <Stack>
                {question.options?.map((option, idx) => (
                    <Button
                        key={idx}
                        onClick={() => handleOptionClick(question.id, option)}
                        style={{ 
                            margin: '5px',
                            backgroundColor: selectedOption === option ? '#4682B4' : 'white',
                            color: selectedOption === option ? 'white' : 'black'
                        }}
                    >
                        {option}
                    </Button>
                ))}
              </Stack>
            );
          default:
            return null;
        }
    };

    const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newResponses = [...responses];
        console.log("TEST newResponses: ", newResponses);
        newResponses[currentQuestionIndex] = event.target.value;
        console.log("TEST newResponses[currentQuestionIndex] ", newResponses[currentQuestionIndex]);
        setResponses(newResponses);
        
    }; 
    

    const sendResponses = () => {
        const formattedResponses = responses.map((answer, index) => ({
            userId: userId, 
            tempId: !userId ? (navigatedTempId || contextTempId) : null,
            questionId: questions[index].id, 
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
          console.log("TEST Sending formatted responses:", formattedResponses);
          console.log('Success:', data);
          let emissionsEndpoint;
          if (userId) {
              emissionsEndpoint = `/api/emissions/user/${userId}`;
          } else if (tempIdToUse) {
              emissionsEndpoint = `/api/emissions/temporary/${tempIdToUse}`; 
          }
      
          return fetch(`http://localhost:3001${emissionsEndpoint}`);
        })
        .then(response => response.json())
        .then(emissionData => {
            let latestEmission = emissionData.length > 0
            ? emissionData.reduce((latest: Emission, current: Emission) => new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current) : {};
            setResponsesCalculation(latestEmission);
            
            setTotalEmission(latestEmission.totalEmissions);
            setTotalConsummationEmissions(latestEmission.totalConsummationEmissions);
            setTotalCountryEmissions(latestEmission.totalCountryEmissions);
            setOverMax(latestEmission.overMax);
            console.log("TEST latestEmission.overMax: ", latestEmission.overMax);
            setSubmissionComplete(true);
            setCurrentQuestionIndex(0);
            setResponses([]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    useEffect(() => {
        console.log("Responses updated:", responses);
    }, [responses]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const isQuestionAvailable = questions.length > 0 && questions[currentQuestionIndex];

    const checkResponsesCalculation = () => {
        console.log("TEST responsesCalculation: ", responsesCalculation);
        setDisplayResponsesCalculation(true);
    }
    

    const displayCalculationResults = () => {
        return responsesCalculation.map((calculation, index) => (
            <Box key={index} p={4} border="1px solid gray" my={2}>
                <Text>ID: {calculation.id}</Text>
                <Text>Created At: {calculation.createdAt}</Text>
                <Text>Total Emissions: {calculation.totalEmissions}</Text>
                <Text>Total Consummation Emissions: {calculation.totalConsummationEmissions}</Text>
                <Text>Total Country Emissions: {calculation.totalCountryEmissions}</Text>
            </Box>
        ));
    };

    const handleNextClick = () => {
        const responseToQ8 = responses[7]; 
        const responseToQ6 = responses[5];
        const countryOnlyEnAvion = ["Montréal, Canada", "Kuala Lumpur, Malaisie", "Le Cap, Afrique du Sud", "Toronto, Canada", "Irvine, Etats-Unis"];
    
        console.log("Response to Question 8:", responseToQ8); 
        console.log("Response to Question 6:", responseToQ6); 
    
        if (countryOnlyEnAvion.includes(responseToQ6)) {
            console.log("TEST user's option for question 6 (countryOnlyEnAvion): ", responseToQ6);
            const newResponses = [...responses];
            newResponses[6] = "Avion";
            setResponses(newResponses);
            setCurrentQuestionIndex(prevIndex => prevIndex + 1); 
            if (responseToQ8 === 'Non') {
                console.log("TEST user chooses NON for question 8.");
                setCurrentQuestionIndex(prevIndex => questions.length - 2);
                setCloseQuestionnaire(true);
            } else if (responseToQ8 === 'Oui') {
                setCurrentQuestionIndex(prevIndex => prevIndex - 1); 
            }
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            console.log("TEST user's option for question 6 (not countryOnlyEnAvion): ", responseToQ6);
            
            if (responseToQ8 === 'Non') {
                console.log("TEST user chooses NON for question 8.");
                setCurrentQuestionIndex(prevIndex => questions.length - 2);
                setCloseQuestionnaire(true);
            } 
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }  
    };


    const handlePartagerClick = () => {
        console.log("TEST handlePartagerClick: ", tempIdToUse);
        if (!userId) {
            setIsPartagerClicked(true);
            setFromPartager(true);
            navigate('/profil', { state: { tempId: tempIdToUse, fromPartager: true } });
        }
    };

    
    const progressPercentage = (currentQuestionIndex / totalQuestionsToAnswer) * 100;

    return (
        <Flex justify="space-between" align="center" flexDirection="column" gap={10} alignItems="center" justifyContent="center">
            {isQuestionAvailable && (
                <Flex flex="2" m={10} width="80%" bgColor="#dddddd" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Questionnaire</Text>
                    <Box width="80%" p={4}>
                        <Progress value={progressPercentage} size="sm" colorScheme="green" />
                    </Box>
                    {(currentQuestionIndex <= questions.length - 1 && !closeQuestionnaire) ?  (
                        <>
                        <Text fontWeight="bold" fontSize="xl"> {currentQuestionIndex+1}. {questions[currentQuestionIndex]?.question_text}</Text>
                        {renderInputField(questions[currentQuestionIndex])}
                        </>
                    ) : (
                        // <Text>Etes-vous sûr de nous envoyer vos réponses ?</Text>   
                        <div></div>
                    )}
                    <Flex gap={200} justify="space-between">
                        {(currentQuestionIndex < questions.length - 1 && !closeQuestionnaire)? (

                            <>
                            <Button bgColor="#003153" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0))} disabled={currentQuestionIndex === 0}>
                                <FaArrowLeft size="24px" color="white" />Précédent
                            </Button>
                             <Button bgColor="#003153" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={handleNextClick}>
                                Suivant<FaArrowRight size="24px" color="white" />
                            </Button></>

                        ) : (
                            <Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={sendResponses}>Envoyer<FaPaperPlane size="24px" color="white" /></Button>
                        )}
                    </Flex>
                </Flex>
            )}

            {submissionComplete && <ResponseVisualization />}
            
            {submissionComplete && (
                <Flex flex="3" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Au total : {totalEmission} kg</Text>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Votre empreinte carbone liée à la mobilité envisagée : {totalCountryEmissions} kg</Text>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Votre empreinte carbone personnelle par an : {totalConsummationEmissions} kg</Text>

                    
                    {(overMax) ? (
                        <>
                            <Flex p= {2} bgColor="#A4DDED" border="4px" borderColor="#0C2340" borderStyle="dashed">
                                <Text fontWeight="bold" fontSize="2xl" color="red" textAlign="center">Attention : Votre empreinte carbone liée à la mobilité dépasse la valeur max définie par l'école ({maxCarbonByPromotion} kg).</Text>
                            </Flex>
                        </>
                        ) : (
                            <Flex p= {2} bgColor="#A4DDED" border="4px" borderColor="#0C2340" borderStyle="dashed">
                                <Text  fontWeight="bold" fontSize="2xl" color="green" textAlign="center">Félicitation : Votre empreinte carbone liée à la mobilité ne dépasse pas la valeur max définie par l'école ({maxCarbonByPromotion} kg).</Text>
                            </Flex> 
                    )}
                        <Text fontWeight="bold" fontSize="xl" color="black" textAlign="center">Merci de nous partager vos réponses et obtenir des suggestions personnalisées !
                            <Button ml={10} bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" gap={3} onClick={handlePartagerClick}>Partager<FaShareAlt size="24px" color="white" /></Button>
                        </Text>
                </Flex>
            )}


            {submissionComplete && (
                <Flex flex="3" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Processus du calcul</Text>
                    <Button bgColor="#0C2340" color="white" width="300px" height="60px" fontSize="xl" p={6} gap={3} onClick={checkResponsesCalculation} ><AiFillEye size="60px" />Check the calculation</Button>
                </Flex>
            )}



        </Flex>
    );
};

export default Question;