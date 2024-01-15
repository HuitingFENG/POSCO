import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';
import { FaSignInAlt } from "react-icons/fa";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

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
            // localStorage.setItem('user', JSON.stringify(data));
            setTimeout(() => {
                navigate('/profil', { state: { user: data } }); 
            }, 1000);
            /* setEmail('');
            setPassword(''); */
        })
        .catch((error) => {
            console.error('Error:', error);
            toast({
                title: 'Connexion échouée.',
                // description: error.message,
                description: "Les données saisies sont incorrectes.",
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
                placeholder="Mot de Passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="blue" type="submit" leftIcon={<FaSignInAlt />}>
                Se Connecter
            </Button>
        </VStack>
    );

};

export default Login;
