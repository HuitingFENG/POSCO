import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';
import {Link, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import {useUser} from "../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    

    const userContext = useUser();

    if (!userContext) {
        // Handle the scenario where context is not available
        // This can be a redirect, an error message, or a loading indicator
        return <div>Context not available</div>;
    }

    const { login } = userContext;


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
            /* setTimeout(() => {
                navigate('/profil', { state: { user: data } }); 
            }, 1000); */
            login(data);
            navigate('/profil', { state: { user: data } });
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
           {/*  <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
            </Button> */}
       
            
            <Button colorScheme="blue" type="submit" leftIcon={<FaSignInAlt />}>
                Se Connecter
            </Button>
            <Link to="/signup"><Button color="#003153" type="submit" leftIcon={<FaUserPlus />}>S'inscrire</Button></Link>
        </VStack>
    );

};

export default Login;
