import { Avatar, Text, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue, Box, Link, Icon } from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiAlertTriangle, FiBookOpen, FiHome } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import "./style.css"
import MyChart from "../chart/chart";

function Dashboard() {
    const { auth } = useAuth()
    const { toggleColorMode } = useColorMode();
    const [theme, toggleTheme] = React.useState(false);
    
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("white", "white");
    const navBarColor = useColorModeValue("#020202", "gray.700");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
      );
    const fullName = auth.name.concat(" ", auth.surname)
    
    return (
        <>
            <Flex 
                pos={"fixed"}
                right="1rem"
                top="1rem"
                align="center"
                >
                <Box
                    cursor={"pointer"}
                    onClick={() => {
                        toggleColorMode();
                        toggleTheme(!theme);
                    }} 
                >
                    {theme ? <FaMoon /> : <FaSun />}
                </Box>
                <Box
                    paddingLeft={3}>
                    <Menu>
                        <MenuButton p='0px'>
                        <Avatar
                            _hover={{ cursor: "pointer" }}
                            color="gray.700"
                            name={fullName}
                            bg="gray.100"
                            size='sm'
                        />
                        </MenuButton>
                        <MenuList
                        boxShadow={shadow}
                        p='0px'
                        mt='10px'
                        borderRadius='20px'
                        bg={menuBg}
                        border='none'>
                        <Flex w='100%' mb='0px'>
                            <Text
                                ps='20px'
                                pt='16px'
                                pb='10px'
                                w='100%'
                                borderBottom='1px solid'
                                borderColor={borderColor}
                                fontSize='sm'
                                fontWeight='700'
                                color={textColor}>
                                    👋&nbsp; Hey, {auth.name}
                            </Text>
                        </Flex>
                        <Flex flexDirection='column' p='10px'>
                            <MenuItem
                                _hover={{ bg: "none" }}
                                _focus={{ bg: "none" }}
                                color='red.400'
                                borderRadius='8px'
                                px='14px'>
                                <Text fontSize='sm'>Log out</Text>
                            </MenuItem>
                        </Flex>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>

            <Flex
                h="100hv"
                flexDir="row"
                overflow="hidden"
            >
                {/* SideBar */}
                <Flex
                    h="100vh"
                    w="15%"
                    flexDir="column"
                    alignItems="center"
                    backgroundColor={navBarColor}
                    color={textColor}
                >
                    <Flex
                        flexDir={"column"}
                        justifyContent="space-between"
                    >
                        <Flex
                            flexDir={"column"}
                            as="nav"
                        >
                            <Heading
                                marginTop={50}
                                marginBottom={100}
                                fontSize="4xl"
                                alignSelf={"center"}
                                letterSpacing="tight"
                            >
                                Grade Chain
                            </Heading>
                            <Flex
                                flexDir={"column"}
                                alignItems="flex-start"
                                justifyContent={"center"}
                            >
                                <Flex className="sidebar-items">
                                    <Link>
                                        <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                    </Link>
                                    <Link _hover={{textDecor: 'none'}}>
                                        <Text className="active">Home</Text>
                                    </Link>
                                </Flex>
                                <Flex className="sidebar-items">
                                    <Link>
                                        <Icon as={FiBookOpen} fontSize="2xl" />
                                    </Link>
                                    <Link _hover={{textDecor: 'none'}}>
                                        <Text >Register</Text>
                                    </Link>
                                </Flex>
                                <Flex className="sidebar-items">
                                    <Link>
                                        <Icon as={FiAlertTriangle} fontSize="2xl" />
                                    </Link>
                                    <Link _hover={{textDecor: 'none'}}>
                                        <Text >Results</Text>
                                    </Link>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                {/* Center Part */}
                <Flex
                    w="85%"
                    p="3%"
                    flexDir="column"
                    overflow="auto"
                    minH="100vh"
                    >
                    <Heading fontWeight={"normal"} mb={4} letterSpacing="tight">Welcome back, <Flex fontWeight={"bold"} display="inline-flex">{auth.name}</Flex></Heading>
                    <Text fontSize={"md"}> Arithmetic Mean : </Text>
                    <Text fontWeight={"bold"} fontSize="2xl"> 28.1 </Text>
                    <Box pt={2}>
                        <MyChart/>
                    </Box>    
                </Flex>
            </Flex>
        </>
    );
}

export default Dashboard;