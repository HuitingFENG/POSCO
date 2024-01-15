import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,Input } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaPaperPlane, FaShareAlt } from 'react-icons/fa';

interface Question {
    id: number;
    question_text: string;
    type: string;
    options?: string[];
}

interface Emission {
    id: number;
    userId: number;
    responsesList: number[];
    totalEmissions: string;
    createdAt: string;
    updatedAt: string;
}

const Question = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<string[]>([]);
    const [submissionComplete, setSubmissionComplete] = useState(false);
    const [closeQuestionnaire, setCloseQuestionnaire] = useState(false);
    // const [retakeTest, setRetakeTest] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [totalEmission, setTotalEmission] = useState(0);
    const [totalConsummationEmissions, setTotalConsummationEmissions] = useState(0);
    const [totalCountryEmissions, setTotalCountryEmissions] = useState(0);
    const maxValue = 100
    const minValue = 0
    const stepValue = 1

    useEffect(() => {
        fetch('http://localhost:3001/api/questions')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a: {id: number; }, b: {id: number; }) => a.id - b.id);
                setQuestions(sortedData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    const renderInputField = (question: Question) => {
/*         const responseToQ8 = responses[8]; 
        // const hasOnlyAvionOption = [];

        if ((question.id === 9 || question.id === 10) && responseToQ8 !== 'Oui') {
            return null;
        } */

        switch (question.type) {
          case 'text':
            // return <Input width="500px" type="text" value={responses[currentQuestionIndex] || ''} onChange={handleResponseChange} />;
            return (
                <Flex >
                    {question.options?.map((option, idx) => (
                        <Button 
                            key={idx}
                            onClick={() => handleResponseChange({ target: { value: option } } as React.ChangeEvent<HTMLInputElement>)}
                            style={{ margin: '5px' }}
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
                        onClick={() => handleResponseChange({ target: { value: option } } as React.ChangeEvent<HTMLInputElement>)} 
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

/*     const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, type } = event.target;
        const newResponses = [...responses];
    
        if (type === 'number') {
            if (value === '' || !isNaN(Number(value))) {
                setInputError(false);
                const newResponses = [...responses];
                newResponses[currentQuestionIndex] = value;
                setResponses(newResponses);
            } else {
                setInputError(true);
            }
        } else {
            newResponses[currentQuestionIndex] = value;
            setResponses(newResponses);
        } 
    }; */
    

    const sendMobiliteRequest = () => {
        console.log("TEST sendMobiliteRequest... ");
    };

    const sendResponses = () => {
        const formattedResponses = responses.map((answer, index) => ({
            userId: 1, 
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
          console.log("Sending formatted responses:", formattedResponses);
          console.log("TEST:", formattedResponses[4].answer);
          console.log('Success:', data);
          const userId = 1;
          return fetch(`http://localhost:3001/api/emissions/user/${userId}`);
          /* setResponses([]);
          setSubmissionComplete(true); 
          setCurrentQuestionIndex(0); */
        })
        .then(response => response.json())
        .then(emissionData => {
            const latestEmission = emissionData.reduce((latest: Emission, current: Emission) => {
                return (new Date(latest.createdAt) > new Date(current.createdAt)) ? latest : current;
            });
            setResponses([]);
            setTotalEmission(latestEmission.totalEmissions);
            setTotalConsummationEmissions(latestEmission.totalConsummationEmissions);
            setTotalCountryEmissions(latestEmission.totalCountryEmissions);
            console.log('Submission complete');
            setSubmissionComplete(true);
            setCurrentQuestionIndex(0);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

   /*  const retake = () => {
        setSubmissionComplete(false);
        setRetakeTest(true);
    };
 */

/*     const shouldDisplayCurrentQuestion = () => {
        const currentQuestionId = questions[currentQuestionIndex].id;
        const responseToQ8 = responses[8];

        // Skip questions 9 and 10 if the response to question 8 is not 'Oui'
        if ((currentQuestionId === 9 || currentQuestionId === 10) && responseToQ8 !== 'Oui') {
            return false;
        }
        return true;
    }; */

/*     const shouldDisplayCurrentQuestion = () => {
        if (currentQuestionIndex >= questions.length) {
            return false;
        }
        const currentQuestionId = questions[currentQuestionIndex].id;
        const responseToQ8 = responses[8];

        if ((currentQuestionId === 9 || currentQuestionId === 10) && responseToQ8 !== 'Oui') {
            return false;
        }
        return true;
    }; */

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const isQuestionAvailable = questions.length > 0 && questions[currentQuestionIndex];

    

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
            // setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            
            if (responseToQ8 === 'Non') {
                console.log("TEST user chooses NON for question 8.");
                setCurrentQuestionIndex(prevIndex => questions.length - 2);
                setCloseQuestionnaire(true);
            } 
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }  
    };


    return (
        <Flex justify="space-between" align="center" flexDirection="column" gap={10}>
            {isQuestionAvailable && (
                <Flex flex="2" m={10} width="80%" bgColor="#dddddd" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Questionnaire</Text>
                    {(currentQuestionIndex <= questions.length - 1 && !closeQuestionnaire) ?  (
                        <>
                        <Text fontWeight="bold" fontSize="xl"> {currentQuestionIndex+1}. {questions[currentQuestionIndex]?.question_text}</Text>
                        {renderInputField(questions[currentQuestionIndex])}
                        </>
                    ) : (
                        // <Text>Etes-vous sûr de nous envoyer vos réponses ?</Text>   
                        <Text></Text> 
                    )}
                    <Flex gap={200} justify="space-between">
                        {(currentQuestionIndex < questions.length - 1 && !closeQuestionnaire)? (

                            <>
                            <Button bgColor="#003153" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0))} disabled={currentQuestionIndex === 0}>
                                <FaArrowLeft size="24px" color="white" />Précédent
                            </Button>
                           {/*  <Button bgColor="#003153" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={() => setCurrentQuestionIndex(prevIndex => prevIndex + 1)}>
                                Suivant<FaArrowRight size="24px" color="white" />
                            </Button></> */}

                             <Button bgColor="#003153" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={handleNextClick}>
                                Suivant<FaArrowRight size="24px" color="white" />
                            </Button></>

                        ) : (
                            <Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={sendResponses}>Envoyer<FaPaperPlane size="24px" color="white" /></Button>
                            /* <Flex flexDirection="row" justify="space-between" align="center" gap={200}>
                                {submissionComplete && (<Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={sendResponses}>Envoyer<FaPaperPlane size="24px" color="white" /></Button>)}
                                {!submissionComplete && (<Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={retake}>Réessayer<FaPaperPlane size="24px" color="white" /></Button>)}
                            </Flex> */
                        )}
                    </Flex>
                </Flex>
            )}



            {submissionComplete && (
                <Flex flex="3" m={10} width="80%" bgColor="skyblue" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10} flexDirection="column" align="center" gap={10}>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Au total : {totalEmission} kg</Text>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Votre empreinte carbone liée à la mobilité envisagée : {totalCountryEmissions} kg</Text>
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Votre empreinte carbone personnelle par an : {totalConsummationEmissions}kg</Text>
                    <Text fontWeight="bold" fontSize="xl" color="black" textAlign="center">Merci de nous partager vos réponses !
                        <Button ml={10} bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" gap={3} onClick={sendMobiliteRequest}>Partager<FaShareAlt size="24px" color="white" /></Button>
                    </Text>
                    {/* <Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={retake}>Réessayer<FaPaperPlane size="24px" color="white" /></Button> */}
                </Flex>
            )}
        </Flex>
    );
};

export default Question;