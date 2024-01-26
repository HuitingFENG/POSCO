import React from "react";
import { Box,Flex,Link,Text,Image,Button,Stack,Center,Icon,useMediaQuery, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {Link as RouterLink, BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { FaQuestionCircle, FaBook, FaCog, FaUser, FaChartBar, FaRegLightbulb, FaUserPlus, FaSignInAlt, FaBars } from "react-icons/fa";
import { IconType } from "react-icons";


interface NavItemProps {
  to: string;
  icon: IconType;
  text: string;
}


const NavItem: React.FC<NavItemProps> = ({ to, icon, text }) => (
  <Link as={RouterLink} to={to}>
    <Flex align="center">
      <Icon as={icon} boxSize={6} mr={2} color="white" />
      <Text fontWeight="bold" fontSize="xl" color="white">
        {text}
      </Text>
    </Flex>
  </Link>
);



const Header = () => {
  const [isLargerThan768px] = useMediaQuery("(min-width: 768px)");

  return (
    // <Flex p={4} align="center" justify="space-between" bg="#0C2340">
    //     <Flex justify="space-between" gap={10} p={1}>
    //         <Link as={RouterLink} to="/"><Image src="../../../assets/icon.png" alt="icon.png" boxSize="100px" /></Link>
    //         <Flex align="center" justify="center">
    //             <Text fontWeight="bold" fontSize="2xl" color="white">POSCO</Text>
    //         </Flex>
    //     </Flex>

    //     <Flex justify="space-between" alignItems="center" gap={10} mr={4}>
    //         <Link as={RouterLink} to="/questionnaire">
    //           <Flex justify="center" alignItems="center" flex="space-between">
    //             <Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaBook} boxSize={6} mr={2} color="white" />Questionnaire</Text>
    //           </Flex>
              
    //         </Link>
    //         <Link as={RouterLink} to="/references"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaChartBar} boxSize={6} mr={2} />Références</Text></Link>
    //         <Link as={RouterLink} to="/actions"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaRegLightbulb} boxSize={6} mr={2} />Actions</Text></Link>
    //         {/* <Link as={RouterLink} to="/signup"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaUserPlus} boxSize={6} mr={2} />S'inscrire</Text></Link> */}
    //         {/* <Link as={RouterLink} to="/login"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaSignInAlt} boxSize={6} mr={2} />Se Connecter</Text></Link> */}
    //         <Link as={RouterLink} to="/profil"><Text fontWeight="bold" fontSize="xl" color="white"><Icon as={FaUser} boxSize={6} mr={2} />Profil</Text></Link>
        
    //     </Flex>
    // </Flex>




    // <Flex p={4} align="center" justify="space-between" bg="#0C2340" wrap="wrap">
    //     <Flex align="center"  justify="space-between" gap={10} p={1}>
    //         <Link as={RouterLink} to="/">
    //             <Image src="../../../assets/icon.png" alt="icon" boxSize="100px" />
    //         </Link>
    //         <Text fontWeight="bold" fontSize="2xl" color="white">POSCO</Text>
    //     </Flex>

    //     <Flex align="center" gap={10} mr={4}>
    //         <Link as={RouterLink} to="/questionnaire">
    //           <Flex align="center">
    //             <Icon as={FaBook} boxSize={6} mr={2} color="white" />
    //             <Text fontWeight="bold" fontSize="xl" color="white">Questionnaire</Text>
    //           </Flex>
    //         </Link>
    //         <Link as={RouterLink} to="/references">
    //           <Flex align="center">
    //             <Icon as={FaChartBar} boxSize={6} mr={2} color="white" />
    //             <Text fontWeight="bold" fontSize="xl" color="white">Références</Text>
    //           </Flex>
    //         </Link>
    //         <Link as={RouterLink} to="/actions">
    //           <Flex align="center">
    //             <Icon as={FaRegLightbulb} boxSize={6} mr={2} color="white" />
    //             <Text fontWeight="bold" fontSize="xl" color="white">Actions</Text>
    //           </Flex>
    //         </Link>
    //         <Link as={RouterLink} to="/profil">
    //           <Flex align="center">
    //             <Icon as={FaUser} boxSize={6} mr={2} color="white" />
    //             <Text fontWeight="bold" fontSize="xl" color="white">Profil</Text>
    //           </Flex>
    //         </Link>
    //     </Flex>
    // </Flex>




    // Add responsive design
    // <Flex
    //   p={4}
    //   align="center"
    //   justify="space-between"
    //   bg="#0C2340"
    //   wrap="wrap"
    // >
    //   <Flex align="center" gap={4}>
    //     <Link as={RouterLink} to="/">
    //       <Image src="../../../assets/icon.png" alt="icon" boxSize="80px" />
    //     </Link>
    //     <Text fontWeight="bold" fontSize="2xl" color="white" display={{ base: "none", md: "block" }}>
    //       POSCO
    //     </Text>
    //   </Flex>

    //   {isLargerThan768px && (
    //     <Flex align="center" gap={5}>
    //       <NavItem to="/questionnaire" icon={FaBook} text="Questionnaire" />
    //       <NavItem to="/references" icon={FaChartBar} text="Références" />
    //       <NavItem to="/actions" icon={FaRegLightbulb} text="Actions" />
    //       <NavItem to="/profil" icon={FaUser} text="Profil" />
    //     </Flex>
    //   )}
    // </Flex>



    <Flex p={4} align="center" justify="space-between" bg="#0C2340" wrap="wrap">
      <Flex align="center" gap={4}>
        <Link as={RouterLink} to="/">
          <Image src="../../../assets/icon.png" alt="icon" boxSize={["60px", "80px"]} />
        </Link>
        <Text fontWeight="bold" fontSize={["lg", "2xl"]} color="white" display={{ base: "none", md: "block" }}>
          POSCO
        </Text>
      </Flex>

      {isLargerThan768px ? (
        <Flex align="center" gap={5}>
          <NavItem to="/questionnaire" icon={FaBook} text="Questionnaire" />
          <NavItem to="/references" icon={FaChartBar} text="Références" />
          <NavItem to="/actions" icon={FaRegLightbulb} text="Actions" />
          <NavItem to="/profil" icon={FaUser} text="Profil" />
        </Flex>
      ) : (
        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton as={Button} variant="outline">
              <FaBars />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/questionnaire">Questionnaire</MenuItem>
              <MenuItem as={RouterLink} to="/references">Références</MenuItem>
              <MenuItem as={RouterLink} to="/actions">Actions</MenuItem>
              <MenuItem as={RouterLink} to="/profil">Profil</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Flex>

  );
};






export default Header;

