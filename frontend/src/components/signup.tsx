import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, VStack, useToast } from '@chakra-ui/react';
import { FaUserPlus } from "react-icons/fa";


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const sendUser = () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast({
                title: 'Erreur',
                description: 'Veuillez remplir tous les champs.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return; 
        }

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
                navigate('/login'); 
            }, 1000);
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

    return (
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <Input 
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
            <Button colorScheme="blue" type="submit" leftIcon={<FaUserPlus />}>S'inscrire</Button>
        </VStack>
    );
};

export default Signup;
