import React, { useState } from 'react';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleSubmit = async () => {
        // Implement login logic here, such as sending a request to your server
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
            <Button colorScheme="blue" onClick={handleSubmit}>Login</Button>
        </VStack>
    );
};

export default Login;
