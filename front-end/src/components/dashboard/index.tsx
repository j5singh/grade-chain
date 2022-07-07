import { Avatar, Text, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue, Box, Link, Icon, Thead, Table, Th, Tbody, Tr, Td } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiAlertTriangle, FiBookOpen, FiHome } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import "./style.css"
import MyChart from "../chart/chart";
import {StudentGrades} from "../chart/grades"

function Dashboard() {
    const { auth, doLogout } = useAuth()
    const { toggleColorMode } = useColorMode();
    const [theme, toggleTheme] = React.useState(false);

    // const [studentGrades, setStudentGrade] = useState({
    //     labels: ['1° Year','2° Year','3° Year'],
    //     dataset: [26, 25, 29],
    //     borderColor: 'rgb(255, 99, 132)',
    //     backgroundColor: 'rgba(255, 99, 132, 0.5)'
    // })
    
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
                                    px='14px'
                                    onClick={doLogout}>
                                    <Text fontSize='sm'>Log out</Text>
                                </MenuItem>
                            </Flex>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>

            <Flex
                h={[null, null, "100vh"]}
                flexDir="row"
                overflow="hidden"
            >
                {/* SideBar */}
                <Flex
                    w="20%"
                    flexDir="column"
                    alignItems="center"
                    backgroundColor={navBarColor}
                    color={textColor}
                    paddingLeft={2}
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
                    w="80%"
                    p="3%"
                    flexDir="column"
                    overflow="auto"
                    minH="100vh"
                    >
                    <Heading fontWeight={"normal"} mb={4} letterSpacing="tight">Welcome back, <Flex fontWeight={"bold"} display="inline-flex">{auth.name}</Flex></Heading>
                    <Text fontSize={"md"}> Arithmetic Mean : </Text>
                    <Text fontWeight={"bold"} fontSize="2xl"> 28.1 </Text>
                    <Box pt={2}>
                        {/* <MyChart chartData={studentGrades}/> */}
                        <MyChart />
                    </Box> 
                    <Flex flexDir={"column"}>
                        <Flex overflow={"auto"}>
                            <Table variant="unstyled" mt={4} >
                                <Thead>
                                    <Tr>
                                        <Th>Subject</Th>
                                        <Th isNumeric>Year</Th>
                                        <Th isNumeric>Result</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr borderBottom={"1px"}>
                                        <Td>
                                            <Text fontWeight={"bold"}>Teoria dei Segnali</Text>
                                            <Text fontWeight={"thin"}>26/01/2021</Text>
                                        </Td>
                                        <Td>2</Td>
                                        <Td>24</Td>
                                    </Tr>
                                    <Tr borderBottom={"1px"}>
                                        <Td>
                                            <Text fontWeight={"bold"}>Analisi 1</Text>
                                            <Text fontWeight={"thin"}>21/02/2020</Text>
                                        </Td>
                                        <Td>1</Td>
                                        <Td>19</Td>
                                    </Tr>
                                    <Tr borderBottom={"1px"}>
                                        <Td>
                                            <Text fontWeight={"bold"}>Basi di Dati</Text>
                                            <Text fontWeight={"thin"}>14/01/2022</Text>
                                        </Td>
                                        <Td>3</Td>
                                        <Td>30</Td>
                                    </Tr>
                                    <Tr borderBottom={"1px"}>
                                        <Td>
                                            <Text fontWeight={"bold"}>Basi di Dati</Text>
                                            <Text fontWeight={"thin"}>14/01/2022</Text>
                                        </Td>
                                        <Td>3</Td>
                                        <Td>30</Td>
                                    </Tr>
                                    <Tr borderBottom={"1px"}>
                                        <Td>
                                            <Text fontWeight={"bold"}>Basi di Dati</Text>
                                            <Text fontWeight={"thin"}>14/01/2022</Text>
                                        </Td>
                                        <Td>3</Td>
                                        <Td>30</Td>
                                    </Tr>
                                    <Tr borderBottom={"1px"}>
                                        <Td>
                                            <Text fontWeight={"bold"}>Basi di Dati</Text>
                                            <Text fontWeight={"thin"}>14/01/2022</Text>
                                        </Td>
                                        <Td>3</Td>
                                        <Td>30</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>
                    </Flex>  
                </Flex>
            </Flex>
        </>
    );
}

export default Dashboard;