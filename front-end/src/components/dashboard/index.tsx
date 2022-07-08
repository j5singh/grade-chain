import { Avatar, Text, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue, Box, Link, Icon, Thead, Table, Th, Tbody, Tr, Td, Grid, Button } from "@chakra-ui/react";
import React from "react";
import { FaAngleDoubleRight, FaMoon, FaSun } from "react-icons/fa";
import { FiAlertTriangle, FiBookOpen, FiHome } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import "./style.css"
import MyChart from "../chart/chart";
import { MockGradeData } from "../chart/grades"
import { Link as ReactLink } from "react-router-dom"

function Dashboard() {
    const { auth, doLogout } = useAuth()
    const { toggleColorMode } = useColorMode();
    const [theme, toggleTheme] = React.useState(false);

    // function useRandomRgb() {
    //     const max = 255
    //     const min = 0
    //     let toPass = [0,0,0]
    
    //     for (let i = 0 ; i < 3 ; i++) {
    //         let x = Math.floor(Math.random() * (max - min + 1)) + min;
    //         toPass.map(() => x)
    //     }
    
    //     return toPass
    // }

    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.5)`;

    const groupedByYear: any[] = MockGradeData.reduce((group: any, grade) => {
        // separate elements by year in different arrays
        const { year } = grade;
        group[year] = group[year] ?? [];
        group[year].push(grade);

        return group;
    }, {});  

    let means: number[] = []
    let total: number = 0
    let count: number = 0
    let dataset: any[] = []

    // for each year calculate the mean
    Object.values(groupedByYear).forEach((element: string | any[]) => {
        let sum = 0
        for (let i = 0 ; i < element.length ; i++) {
            let sub = {}
            let data = [0, 0, 0]
            let backColor = randomRGB()

            data[element[i]['year'] - 1] = element[i]['grade']
            sub = {
                label: element[i]['courseName'],
                borderColor: 'rgb(255, 255, 255)',
                backgroundColor: backColor,
                data: data
            }
            sum += element[i]['grade']
            dataset.push(sub)
        }

        means.push(sum/element.length)
    });

    // calulate the total mean of the three years
    means.forEach(function(value) {
        total += value
        count++
    })

    const [studentGrades] = React.useState({
        labels: [['1° Year'],['2° Year'],['3° Year']],
        dataset: dataset,       
    })
    
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("black", "white");
    const navBarColor = useColorModeValue("#020202", "gray.700");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const fullName = auth.name.concat(" ", auth.surname)
    
    return (
        <>
            {/* Navbar (top) */}
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
                maxW="2000px"
                flexDir={["column", "column", "row"]}
                overflow="hidden"
            >
                {/* SideBar */}
                <Flex
                    w={["100%", "100%", "10%", "15%", "15%"]}
                    flexDir="column"
                    alignItems="center"
                    backgroundColor={navBarColor}
                    color="white"
                    paddingLeft={2}
                >
                    <Flex
                        flexDir={"column"}
                        h={[null, null, "100vh"]}
                        justifyContent="space-between"
                    >
                        <Flex
                            flexDir={"column"}
                            as="nav"
                        >
                            <Heading
                                mt={50}
                                mb={[25, 50, 100]}
                                fontSize={["4xl", "4xl", "2xl", "3xl", "4xl",]}
                                alignSelf={"center"}
                                letterSpacing="tight"
                            >
                                Grade Chain
                            </Heading>
                            <Flex
                                flexDir={["row", "row", "column", "column", "column"]}
                                align={["center", "center", "center", "flex-start", "flex-start"]}
                                wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                                justifyContent="center"
                            >
                                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                                        <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                    </Link>
                                    <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                        <Text className="active">Home</Text>
                                    </Link>
                                </Flex>
                                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                                        <Icon as={FiBookOpen} fontSize="2xl" />
                                    </Link>
                                    <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                        <Text>Register</Text>
                                    </Link>
                                </Flex>
                                <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                    <Link display={["none", "none", "flex", "flex", "flex"]}>
                                        <Icon as={FiAlertTriangle} fontSize="2xl" />
                                    </Link>
                                    <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                        <Text>Results</Text>
                                    </Link>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                            <Avatar my={2} src="avatar-1.jpg" />
                            <Text textAlign="center">{fullName}</Text>
                        </Flex>
                    </Flex>
                </Flex>

                {/* Center Part */}
                <Flex
                    w="100%"
                    p="3%"
                    flexDir="column"
                    overflow="auto"
                    minH="100vh"
                >
                    <Heading
                        fontWeight={"normal"}
                        mb={4}
                        letterSpacing="tight"
                    >
                        Welcome back, <Flex fontWeight={"bold"} display="inline-flex">{auth.name}</Flex>
                    </Heading>
                    <Text fontSize={"md"}> Arithmetic Mean : </Text>
                    <Text fontWeight={"bold"} fontSize="2xl"> {Number(total / count).toFixed(2)} </Text>
                    <Grid 
                        gap={"20px"} 
                        alignItems={"center"}
                        gridTemplateColumns="repeat(2, 1fr)">
                        <MyChart chartData={studentGrades}/>
                    </Grid>
                    <Flex justifyContent="space-between" mt={8}>
                        <Flex align="flex-end">
                            <Heading as="h2" size="lg" letterSpacing="tight">Latest Grades</Heading>
                        </Flex>
                        <Flex align="flex-end">
                            <Button rightIcon={<FaAngleDoubleRight />} colorScheme='pink' variant='solid'>
                                <Link as={ReactLink} to="/grades">See All</Link>
                            </Button>
                        </Flex>
                    </Flex>
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
                                    {MockGradeData.slice(0,3).map((item, i) => {
                                        return [
                                            <Tr key={i} borderBottom={"1px"}>
                                                <Td>
                                                    <Text fontWeight={"bold"}>{item.courseName}</Text>
                                                    <Text fontWeight={"thin"}>{item.exameDay}</Text>
                                                </Td>
                                                <Td>{item.year}</Td>
                                                <Td>{item.grade}</Td>
                                            </Tr>
                                        ]
                                    })}
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