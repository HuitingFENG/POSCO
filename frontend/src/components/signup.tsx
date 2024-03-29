import React, { useContext, useState } from 'react';
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import { Button, Input, VStack, useToast } from '@chakra-ui/react';
import { FaUserPlus } from "react-icons/fa";
import { useTempId } from '../context/TempIdContext';
import { PartagerContext } from '../context/PartagerContext';


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();
    // const { tempId, setTempId } = useTempId();
    // const clearTempId = () => setTempId(null);
    // const [ newUserId, setNewUserId ] = useState();
    const location = useLocation();
    const { tempId: contextTempId, setTempId } = useTempId();
    const navigatedTempId = location.state?.tempId;
    const tempIdToUse = navigatedTempId || contextTempId;
    const clearTempId = () => setTempId(null);
    const { fromPartager, setFromPartager } = useContext(PartagerContext);

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


        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, tempIdToUse }),
        })
        .then(response => {
            console.log("TEST response: ", response);
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) }); 
            }
            return response.json();
        })
/*         .then(data => {
            const newUserId = data.userId;
            setNewUserId(newUserId); // Save the new user ID
            // ... existing toast and navigation logic ...
        }) */
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
            // clearTempId();
            setTempId(null);
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
/*         <VStack spacing={4} as="form" onSubmit={handleSubmit} width="50%" bgColor="#dddddd" border="4px" borderColor="#0C2340" borderStyle="dashed" p={10}>
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
            <Link to="/login"><Button color="#003153" type="submit" leftIcon={<FaUserPlus />}>Se Connecter</Button></Link>
        </VStack> */

        <VStack
            spacing={4}
            as="form"
            onSubmit={handleSubmit}
            width="50%"
            bgColor="#f8f8f8" // Changed to a lighter and softer background color
            border="2px" // Thinner border for a more elegant look
            borderColor="#0C2340"
            borderRadius="lg" // Added border radius for rounded corners
            boxShadow="sm" // Subtle shadow for depth
            p={6} // Adjusted padding for better spacing
        >
            <Input 
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                borderColor="#cccccc" // Softened border color
                _hover={{ borderColor: "#0C2340" }} // Change border color on hover
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }} // Focus effect
            />
            <Input 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor="#cccccc"
                _hover={{ borderColor: "#0C2340" }}
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }}
            />
            <Input 
                placeholder="Mot de Passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor="#cccccc"
                _hover={{ borderColor: "#0C2340" }}
                _focus={{ borderColor: "#0C2340", boxShadow: "outline" }}
            />
            <Button
                colorScheme="blue"
                type="submit"
                leftIcon={<FaUserPlus />}
                bgColor="#0C2340" // Changed button color
                color="white" // Text color for contrast
                _hover={{ bgColor: "#003153" }} // Hover effect
            >
                S'inscrire
            </Button>
            <Link to="/login">
                <Button
                    bgColor="#f2f2f2" // Lighter color for the secondary button
                    color="#0C2340" 
                    _hover={{ bgColor: "#e2e2e2" }} // Hover effect
                    leftIcon={<FaUserPlus />}
                >
                    Se Connecter
                </Button>
            </Link>
        </VStack>



    );
};

export default Signup;
