import React, { useState } from 'react';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleSubmit = async () => {
        // You need to implement the signup logic, possibly sending data to your server
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
    );
};

export default Signup;
