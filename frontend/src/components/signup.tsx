import React, { useState } from 'react';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    // const [input, setInput] = useState<string[]>([]);


    const sendUser = () => {
        fetch('http://localhost:3001/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then(response => {
            console.log("TEST response: ", response);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            toast({
                title: 'Inscription réussie.',
                description: 'Bienvenue chez nous !',
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/login';
            }, 5000);
        })
        .catch((error) => {
            console.error('Error:', error);
            toast({
                title: 'Inscription échouée.',
                description: error.message,
                status: 'error',
                duration: 1000,
                isClosable: true,
            });
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault(); 
        sendUser();
    };

/*     const sendResponses = () => {
        // Validation before sending responses
        if (!validateResponses()) {
            // If validation fails, exit the function
            return;
        }
    
        const formattedResponses = responses.map((answer, index) => ({
            userId: 1, 
            questionId: questions[index].id, 
            answer: answer
        }));
    
        // ... [existing fetch request code] ...
    };
    
    const validateResponses = () => {
        // Basic validation example
        for (let i = 0; i < questions.length; i++) {
            const response = responses[i];
            if (!response || response.trim() === '') {
                // Trigger an error message for empty response
                alert(`Response for question ${i + 1} is required.`);
                return false;
            }
            // Add more validation logic here if needed
        }
        return true;
    }; */

    return (
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <Input 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="blue" type="submit">S'inscrire</Button>
        </VStack>
    );



/* 

    const handleSubmit = async () => {
        toast({
            title: 'Signup successful.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <VStack spacing={4}>
            <Input 
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleSubmit}>Sign Up</Button>
        </VStack>
    ); */
};

export default Signup;
