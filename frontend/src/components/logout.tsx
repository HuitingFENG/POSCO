import React from 'react';
import { Button } from '@chakra-ui/react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
    const userContext = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (userContext) {
            userContext.logout(); 
            navigate('/'); 
        }
    };

    return (
        <Button width="250px" height="60px" p={6} fontSize="xl" onClick={handleLogout} colorScheme="red" gap= {3}><FaSignOutAlt />Déconnexion</Button>
    );
};

export default LogoutButton;

