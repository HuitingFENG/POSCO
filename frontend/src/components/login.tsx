import React, { useState } from 'react';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaChartBar, FaRegLightbulb, FaUserPlus, FaSignInAlt } from "react-icons/fa";



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

/*     const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3001/users/login', { // Make sure the URL matches your server's configuration
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });


            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Login successful.',
                    description: data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                
                // window.location.href = 'http://localhost:3000/profil';
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Login failed.',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                // Handle cases where the error is not an instance of Error
                toast({
                    title: 'Login failed.',
                    description: 'An unknown error occurred',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }; */

    const sendUser = () => {
        console.log("TEST email: ", email);
        console.log("TEST password: ", password);

        fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
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
                title: 'Connexion réussie.',
                description: 'Content de vous revoir !',
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            setEmail('');
            setPassword('');
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/profil';
            }, 5000);
        })
        .catch((error) => {
            console.error('Error:', error);
            toast({
                title: 'Connexion échouée.',
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

    return (
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
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
            <Button colorScheme="blue" type="submit" leftIcon={<FaSignInAlt />}>
                Se Connecter
            </Button>
        </VStack>
    );


/*     const handleSubmit = async () => {
        
        toast({
            title: 'Login successful.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <VStack spacing={4}>
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
            <Button colorScheme="blue" onClick={handleSubmit}>Se Connecter</Button>
        </VStack>
    ); */






};

export default Login;
