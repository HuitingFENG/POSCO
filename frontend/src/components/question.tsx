import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,Input } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaPaperPlane } from 'react-icons/fa';

interface Question {
    id: number;
    question_text: string;
    type: string;
    options?: string[];
}

const Question = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<string[]>([]);
    const [submissionComplete, setSubmissionComplete] = useState(false);
    // const [retakeTest, setRetakeTest] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [totalEmission, setTotalEmission] = useState(0);
    const maxValue = 100
    const minValue = 0
    const stepValue = 1
    const countryByAvion = ["Montréal, Canada", "Kuala Lumpur, Malaisie", "Le Cap, Afrique du Sud", "Toronto, Canada", "Irvine, Etats-Unis"]


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

    const renderInputField = (question: Question) => {
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
                   
            /* return (
                <Flex>
                    <Input width="250px" type="number" value={responses[currentQuestionIndex] || ''} onChange={handleResponseChange} min={minValue} max={maxValue} step={stepValue} isInvalid={inputError} /> 
                    {inputError && <Text color="red.500">Please enter a valid number</Text>}
                </Flex>
            );  */
            
/*             return (
                <Flex alignItems="center" justify="space-between">
                    <button onClick={handleDecrement}>▼</button>
                    <input 
                        type="number"
                        value={responses[currentQuestionIndex] || ''}
                        onChange={handleResponseChange}
                    />
                    <button onClick={handleIncrement}>▲</button>
                </Flex>
            ); */
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
        newResponses[currentQuestionIndex] = event.target.value;
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
          if (countryByAvion.includes(formattedResponses[4].answer)) {
            setTotalEmission(100);
            setTotalEmission(parseFloat(formattedResponses[0].answer));
          } else {
            setTotalEmission(50);
          }
          console.log('Success:', data);
          setResponses([]);
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
                    {renderInputField(questions[currentQuestionIndex])}
                    <Flex gap={200} justify="space-between">
                        {currentQuestionIndex < questions.length - 1 ? (
                            <>
                            <Button bgColor="#003153" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0))} disabled={currentQuestionIndex === 0}>
                                <FaArrowLeft size="24px" color="white" />Précédent
                            </Button>
                            <Button bgColor="#003153" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={() => setCurrentQuestionIndex(prevIndex => prevIndex + 1)}>
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
                    <Text fontWeight="bold" fontSize="4xl" color="black" textAlign="center">Votre résultat : {totalEmission} </Text>
                    <Text fontWeight="bold" fontSize="xl" color="black" textAlign="center">Merci de nous avoir envoyer vos réponses !</Text>
                    {/* <Button bgColor="#0C2340" color="white" width="180px" height="60px" fontSize="xl" p={6} gap={3} onClick={retake}>Réessayer<FaPaperPlane size="24px" color="white" /></Button> */}
                </Flex>
            )}
        </Flex>
    );
};

export default Question;