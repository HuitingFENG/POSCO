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
import TransportData from './transportData';
import { Select } from "@chakra-ui/react";
import CalculationVisualization from "./calculationVisualization";


interface DestinationOption {
    mobiliteCategoryId: number;
    options: string[];
}

interface Question {
    id: number;
    question_text: string;
    type: string;
    options?: string[];
}

interface Emission {
    // totalCountryEmissions: ReactNode;
    // calculation: ReactNode;
    // totalConsummationEmissions: ReactNode;
    id: number;
    userId: number;
    tempId: string;
    responsesList: number[];
    totalEmissions: string;
    createdAt: string;
    // updatedAt: string;
    totalCountryEmissions: number;
    // calculation: ReactNode;
    totalConsummationEmissions: number;
    subConsummationEmissions: number[];
    subCountryEmissions: number[];
    overMax: boolean;
}

interface SubEmissionData {
    transportsEmissions?: number;
    foodsEmissions?: number;
    totalMobilityEmissions?: number;
    totalEffetRebondEmissions?: number;
}


// interface EmissionData {
//     id: number;
//     userId: number | null;
//     tempId: string | null;
//     totalEmissions: number;
//     totalConsummationEmissions: number;
//     totalCountryEmissions: number;
//     subConsummationEmissions: SubEmissionData;
//     subCountryEmissions: SubEmissionData;
//     createdAt: string; 
// }


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
    const [destinationOptions, setDestinationOptions] = useState<DestinationOption[]>([]);
    const [answeredNonToQ11, setAnsweredNonToQ11] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [latestEmissionData, setLatestEmissionData] = useState<Emission[]>([]);
    const [latestEmissionDataId, setLatestEmissionDataId] = useState(0);


    useEffect(() => {
        fetch('http://localhost:3001/api/options/')
            .then(response => response.json())
            .then(data => {
                setDestinationOptions(data);
                console.log("TEST setDestinationOptions: ", destinationOptions);
            })
            .catch(error => {
                console.error('Error fetching destination options:', error);
            });
    }, []);

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
                console.log("TEST sortedData.length: ", sortedData.length);
                // const initialQuestions = sortedData.filter((q: { id: number; }) => q.id <= 22); // Load only questions up to ID 22 initially
                // setQuestions(initialQuestions);
                // console.log("TEST initialQuestions: ", initialQuestions.length);
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
    const [selectedMobilityType, setSelectedMobilityType] = useState('');
    const allQuestionsAnswered = responses.length === questions.length;
    const [isQuestionnaireFullyLoaded, setIsQuestionnaireFullyLoaded] = useState(false);
    const [listForCalculation, setListForCalculation] = useState([]);



    useEffect(() => {
        setTotalQuestionsToAnswer(questions.length);
    }, [questions]);

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
        if (questionId === 1) {
            setSelectedMobilityType(option);
            
        }
    };


    const renderInputField = (question: Question) => {
        const selectedOption = selectedOptions[question.id];
        const shouldUseSelectTag = question.options && question.options.length > 5 ;


        if (question.options && question.options.length > 5) {
            let optionsToRender = question.options;
    
            if (question.id === 6) {
                // Special handling for question 6
                optionsToRender = getOptionsForQuestion6();
            }
    
            return (
                <Select 
                    key={`select-${question.id}`} // Unique key for each question
                    width="50%" bgColor="white" textStyle="bold" textColor="black"
                    placeholder="Sélectionner un choix"
                    onChange={(event) => handleOptionClick(question.id, event.target.value)}
                    value={selectedOption || ''} // Reset value when question changes
                >
                    {optionsToRender.map((option, idx) => (
                        <option key={`${question.id}-${idx}`} value={option}>
                            {option}
                        </option>
                    ))}
                </Select>
            );
        }

        if (question.id === 6) {
            const question6Options = getOptionsForQuestion6();
            return (
                <Select  key={`select-${question.id}`}   
                    width="50%" bgColor="white" textStyle="bold" textColor="black"
                    placeholder="Sélectionner un choix"
                    onChange={(event) => handleOptionClick(question.id, event.target.value)}
                    value={selectedOption}
                >
                    {question6Options.map((option, idx) => (
                        // <option key={idx} value={option}>{option}</option>
                        <option key={`${question.id}-${idx}`} value={option}>{option}</option>
                    ))}
                </Select>
            );
        }
    
        if (shouldUseSelectTag) {
            return ( 
                <Select width="50%" bgColor="white" textStyle="bold" textColor="black"
                    placeholder="Sélectionner un choix"
                    onChange={(event) => handleOptionClick(question.id, event.target.value)}
                    value={selectedOption}
                >
                    {question.options?.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                    ))}
                </Select>
            );
        }


        switch (question.type) {
          case 'text':
            // return (
            //     <Flex >
            //         {question.options?.map((option, idx) => (
            //             <Button 
            //                 key={idx}
            //                 onClick={() => handleOptionClick(question.id, option)}
            //                 style={{ 
            //                     margin: '5px',
            //                     backgroundColor: selectedOption === option ? '#4682B4' : 'white', 
            //                     color: selectedOption === option ? 'white' : 'black'
            //                 }}
            //             >
            //                 {option}
            //             </Button>
            //         ))}
            //     </Flex>
            // );

            // return (
            //     <Flex>
            //         {question.options?.map((option, idx) => (
            //             <Button
            //                 key={idx}
            //                 onClick={() => handleOptionClick(question.id, option)}
            //                 style={{
            //                     margin: '5px',
            //                     backgroundColor: selectedOption === option ? '#4682B4' : 'white',
            //                     color: selectedOption === option ? 'white' : 'black'
            //                 }}
            //             >
            //                 {option}
            //             </Button>
            //         ))}
            //     </Flex>
            // );

            if (question.id === 6) {
                const question6Options = getOptionsForQuestion6();
                return (
                    <Flex>
                        {question6Options.map((option: string, idx: number) => (
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
            }
            return (
                <Flex>
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
            setLatestEmissionData(latestEmission);
            setLatestEmissionDataId(latestEmission.id);
            setListForCalculation(latestEmission.responsesList);
            setTotalEmission(latestEmission.totalEmissions);
            setTotalConsummationEmissions(latestEmission.totalConsummationEmissions);
            setTotalCountryEmissions(latestEmission.totalCountryEmissions);
            setOverMax(latestEmission.overMax);
            console.log("TEST latestEmission.overMax: ", latestEmission.overMax);
            setSubmissionComplete(true);
            setResponses([]);
            setCurrentQuestionIndex(0);
            
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


    const loadFullQuestionnaire = () => {
        fetch('http://localhost:3001/api/questions')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
                setQuestions(sortedData); 
                setIsQuestionnaireFullyLoaded(true);
                console.log("TEST loadFullQuestionnaire sortedData: ", sortedData); 
            })
            .catch(error => console.error('Error fetching data:', error));
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



        // const responseToQ6 = responses[5];
        // const countryOnlyEnAvion = ["Montréal, Canada", "Kuala Lumpur, Malaisie", "Le Cap, Afrique du Sud", "Toronto, Canada", "Irvine, Etats-Unis"];

        // if (countryOnlyEnAvion.includes(responseToQ6)) {
        //     setResponses(prevResponses => {
        //         const newResponses = [...prevResponses];
        //         newResponses[6] = "Avion";
        //         return newResponses;
        //     });
        // }

        // let isFullyLoaded = responses[0] === "PGE_L3_FISE";

        // // Check if the questionnaire should terminate early
        // const shouldTerminateEarly = responses.some((response, index) => {
        //     return (index === 7 || index === 10 || index === 13 || index === 16 || index === 19) && response === 'Non';
        // });

        // const shouldTerminateEarlyFull = isFullyLoaded && responses.some((response, index) => {
        //     return (index === 24 || index === 27 || index === 30 || index === 33 || index === 36) && response === 'Non';
        // });

        // if (shouldTerminateEarly || shouldTerminateEarlyFull) {
        //     setCurrentQuestionIndex(questions.length - 2);
        //     setCloseQuestionnaire(true);
        //     return;
        // }

        // if (currentQuestionIndex === 0 && isFullyLoaded) {
        //     loadFullQuestionnaire();
        //     setIsQuestionnaireFullyLoaded(true);
        // }

        // // Ensure that the next question is within the range of available questions
        // const nextQuestionIndex = currentQuestionIndex + 1;
        // if (nextQuestionIndex < questions.length) {
        //     setCurrentQuestionIndex(nextQuestionIndex);
        // } else {
        //     // If no more questions, finalize the questionnaire
        //     setCloseQuestionnaire(true);
        // }




        // const isFullyLoaded = responses[0] === "PGE_L3_FISE";
        // const earlyTerminationResponses = [7, 10, 13, 16, 19];
        // const fullTerminationResponses = [24, 27, 30, 33, 36];

        // // Check if the questionnaire should terminate early
        // const shouldTerminateEarly = earlyTerminationResponses.some(index => responses[index] === 'Non');
        // const shouldTerminateEarlyFull = isFullyLoaded && fullTerminationResponses.some(index => responses[index] === 'Non');

        // console.log("Current Question Index (Before Update):", currentQuestionIndex);


        // if (shouldTerminateEarly && !isFullyLoaded) {
        //     // If the questionnaire is not fully loaded and a termination condition is met
        //     setCurrentQuestionIndex(questions.length - 2);
        //     setCloseQuestionnaire(true);
        //     return;
        // } else if (shouldTerminateEarlyFull) {
        //     // If the questionnaire is fully loaded and a termination condition is met
        //     setCurrentQuestionIndex(questions.length - 2);
        //     setCloseQuestionnaire(true);
        //     return;
        // } else if (shouldTerminateEarly && isFullyLoaded) {
        //     // If 'Non' is selected in the first part and the questionnaire is fully loaded, jump to SWIM questions
        //     const swimQuestionStartIndex = questions.findIndex(q => q.id === 23);
        //     console.log("Jumping to question with id 23, Index:", swimQuestionStartIndex);
        
        //     setCurrentQuestionIndex(swimQuestionStartIndex);
        //     return;
        // } else {
        //     // Proceed to the next question
        //     setCurrentQuestionIndex(currentQuestionIndex + 1);
        // }
    
        // console.log("Current Question Index (After Update):", currentQuestionIndex);
    



        // // Check if it's time to load the full questionnaire
        // if (currentQuestionIndex === 0 && isFullyLoaded && !isQuestionnaireFullyLoaded) {
        //     loadFullQuestionnaire();
        //     setIsQuestionnaireFullyLoaded(true);
        // }

        // // Proceed to the next question
        // if (currentQuestionIndex < questions.length - 1) {
        //     setCurrentQuestionIndex(currentQuestionIndex + 1);
        // } else {
        //     // No more questions, finalize the questionnaire
        //     setCloseQuestionnaire(true);
        // }





        // const responseToQ20 = responses[19];
        // const responseToQ17 = responses[16];
        // const responseToQ14 = responses[13];
        // const responseToQ11 = responses[10];
        // const responseToQ8 = responses[7]; 
        // const responseToQ6 = responses[5];
        // const countryOnlyEnAvion = ["Montréal, Canada", "Kuala Lumpur, Malaisie", "Le Cap, Afrique du Sud", "Toronto, Canada", "Irvine, Etats-Unis"];
        // if (countryOnlyEnAvion.includes(responseToQ6)) {
        //     setResponses(prevResponses => {
        //         const newResponses = [...prevResponses];
        //         newResponses[6] = "Avion";
        //         return newResponses;
        //     });
        // }
        // if (currentQuestionIndex === 0 && responses[0] === "PGE_L3_FISE") {
        //     console.log("TEST currentQuestionIndex === 0 && responses[0] === PGE_L3_FISE");
        //     loadFullQuestionnaire();
        //     setIsQuestionnaireFullyLoaded(true);
        // } 
        // let responseToQ23, responseToQ25, responseToQ28, responseToQ31, responseToQ34, responseToQ37;
        // if (isQuestionnaireFullyLoaded) {
        //     console.log("TEST isQuestionnaireFullyLoaded");
        //     responseToQ23 = responses[22] || null;
        //     responseToQ25 = responses[24] || null;
        //     responseToQ28 = responses[27] || null;
        //     responseToQ31 = responses[30] || null;
        //     responseToQ34 = responses[33] || null;
        //     responseToQ37 = responses[36] || null;
        // }
        // let isFullyLoaded = responses[0] === "PGE_L3_FISE";
        // let terminateEarly = responseToQ8 === 'Non' || responseToQ11 === 'Non' || responseToQ14 === 'Non' || responseToQ17 === 'Non' || responseToQ20 === 'Non';
        // let terminateEarlyFull = isFullyLoaded && (responseToQ25 === 'Non' || responseToQ28 === 'Non' || responseToQ31 === 'Non' || responseToQ34 === 'Non' || responseToQ37 === 'Non');
        // if ((terminateEarly && !isFullyLoaded) || terminateEarlyFull) {
        //     console.log("TEST (terminateEarly && !isFullyLoaded) || terminateEarlyFull");
        //     console.log("TEST setCurrentQuestionIndex(questions.length - 2) : ", questions.length - 2);
        //     setCurrentQuestionIndex(questions.length - 2);
        //     setCloseQuestionnaire(true);
        //     return; 
        // } else if (terminateEarly && isFullyLoaded) {
        //     console.log("TEST terminateEarly && isFullyLoaded");
        //     let questionSwimId = questions.length - 18;
        //     console.log("TEST setCurrentQuestionIndex(questionSwimId) : ", questionSwimId);
        //     console.log("TEST questionSwimId: ", questions[questionSwimId].question_text);
        //     setCurrentQuestionIndex(questionSwimId);
        // } 
        // setCurrentQuestionIndex(currentQuestionIndex + 1);
        // console.log("TEST currentQuestionIndex: ", currentQuestionIndex);
        








        // if ((responseToQ25 === 'Non'|| responseToQ28 === 'Non' || responseToQ31 === 'Non' || responseToQ34 === 'Non' || responseToQ37 === 'Non') && (responses[0] === "PGE_L3_FISE")) {
        //     setCurrentQuestionIndex(questions.length - 2); 
        //     setCloseQuestionnaire(true);
        //     console.log("TEST close questionnaire.");
        // } else if ((responseToQ8 === 'Non'|| responseToQ11 === 'Non' || responseToQ14 === 'Non' || responseToQ17 === 'Non' || responseToQ20 === 'Non') && (responses[0] === "PGE_L3_FISE")) {
        //     console.log("TEST skip to question of SWIM.");
        //     setCurrentQuestionIndex(22); 
        //     // return;
        // } else {
        //     console.log("TEST continue to display questions.");
        //     setCurrentQuestionIndex(currentQuestionIndex + 1); // Proceed to the next question
        // }

        // if (currentQuestionIndex === 0) {
        //     if (isFullyLoaded) {
        //         loadFullQuestionnaire();
        //         setIsQuestionnaireFullyLoaded(true);
        //     } else {
        //         // Skip to question 23 if not fully loaded
        //         setCurrentQuestionIndex(22);
        //         return;
        //     }
        // }
        

        // if (responseToQ11 === 'Oui') {
        //     console.log("User chose OUI for Question 11. Repeating questions 9, 10, 11.");
        //     setCurrentQuestionIndex(8); // Set to question 9's index
        //     return;
        // }
    
        // if (countryOnlyEnAvion.includes(responseToQ6)) {
        //     console.log("TEST user's option for question 6 (countryOnlyEnAvion): ", responseToQ6);
        //     const newResponses = [...responses];
        //     newResponses[6] = "Avion (long courrier >= 6h)";
        //     setResponses(newResponses);
        //     setCurrentQuestionIndex(prevIndex => prevIndex + 1); 
        //     if (responseToQ8 === 'Non') {
        //         console.log("TEST user chooses NON for question 8.");
        //         setCurrentQuestionIndex(prevIndex => questions.length - 2);
        //         setCloseQuestionnaire(true);
        //     } else if (responseToQ8 === 'Oui') {
        //         setCurrentQuestionIndex(prevIndex => prevIndex - 1); 
        //     }
        //     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        // } else {
        //     console.log("TEST user's option for question 6 (not countryOnlyEnAvion): ", responseToQ6);
            
        //     if (responseToQ8 === 'Non') {
        //         console.log("TEST user chooses NON for question 8.");
        //         setCurrentQuestionIndex(prevIndex => questions.length - 2);
        //         setCloseQuestionnaire(true);
        //     } 
        //     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        // }  

        // if (responseToQ11 === 'Oui') {
        //     setCurrentQuestionIndex(8); // Redirect to Question 9
        //     setAnsweredNonToQ11(false);
        //     return; // Early exit if user chose 'Oui' for Question 11
        // } else if (responseToQ11 === 'Non') {
        //     setAnsweredNonToQ11(true);
        // }


        // if (currentQuestionIndex === 10) { // Assuming question 11 has index 10
        //     console.log("TEST responseToQ11: ", responseToQ11);
        //     if (responseToQ11 === 'Oui') {
        //         console.log("TEST responseToQ11 === 'Oui' ");
        //         setSubmissionComplete(false);
        //         setCloseQuestionnaire(false);
        //         // setCurrentQuestionIndex(8); // Redirect to Question 9
        //         return;
        //     } else if (responseToQ11 === 'Non') {
                
        //         setAnsweredNonToQ11(true);
        //         setCloseQuestionnaire(true);
        //         return;
        //     }
        // }
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


    const getOptionsForQuestion6 = () => {
        const mobilityCategoryMapping : {[key: string]: number } = {
            'PGE_L3_FISE': 1,
            'PGE_L3_FISA': 1,
            'PEx_B2': 3,
            'PEx_M2_Msc_Cyber': 4,
            'PEx_M2_Optionnelle': 5
        };
        console.log("Selected Mobility Type:", selectedMobilityType);
        if (!selectedMobilityType) {
            console.warn("No mobility type selected");
            return [];
        }
        const categoryId = mobilityCategoryMapping[selectedMobilityType];
        console.log("TEST categoryId: ", categoryId);
        const destinationOption = destinationOptions.find(option => option.mobiliteCategoryId === categoryId);
        if (!destinationOption) {
            console.warn(`No options found for category ID: ${categoryId}`);
            return [];
        }

        return destinationOption.options;
    };
    




    return (
        <Flex justify="space-between" align="center" flexDirection="column" gap={10} alignItems="center" justifyContent="center">
            
            { /* !submissionComplete  &&  */ isQuestionAvailable && (
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
                            // <></>
                            // (!submissionComplete && answeredNonToQ11) && (
                                <Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={sendResponses}>Envoyer<FaPaperPlane size="24px" color="white" /></Button>
                            // )
                            // <Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={sendResponses}>Envoyer<FaPaperPlane size="24px" color="white" /></Button>
                        )}
                    </Flex>
                </Flex>
            )}

            

            {/* {submissionComplete && <TransportData />} */}
            {submissionComplete && <ResponseVisualization />}
            
            {submissionComplete && (
                <Flex flex="3" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="2xl" color="black" textAlign="center">Au total : {totalEmission} kg</Text>
                    <Text fontWeight="bold" fontSize="2xl" color="black" textAlign="center">Votre empreinte carbone liée à la mobilité envisagée : {totalCountryEmissions} kg</Text>
                    <Text fontWeight="bold" fontSize="2xl" color="black" textAlign="center">Votre empreinte carbone personnelle par an : {totalConsummationEmissions} kg</Text>

                    
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
                    {displayResponsesCalculation && <CalculationVisualization latestEmissionDataId={latestEmissionDataId} listForCalculation={listForCalculation} /* totalCountryEmissions={totalCountryEmissions}  totalConsummationEmissions={totalConsummationEmissions}  *//>}
                </Flex>
            )}

            

        </Flex>
        
    );
};

export default Question;

