import { Text, Flex, Heading, Link, Thead, Table, Th, Tbody, Tr, Td, Grid, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import "./style.css"
import MyChart from "../chart/chart";
import { Link as ReactLink } from "react-router-dom"
import IGrades from "../../models/grades";

function Dashboard() {
    const { auth } = useAuth()
    const [gradesChartData, setGradesChartData] = React.useState({labels: [['1° Year'],['2° Year'],['3° Year']], dataset: [[]], average: "0"})
    const [grades, setGrades] = React.useState<IGrades>()

    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.5)`;

    useEffect(() => {
        async function getGrades() {
            const response = await fetch('/api/studentgrades', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serialNumber: auth.serialNumber
                }),
            })
            const data = await response.json()
            const gradesData = data.result_data
            setGrades(gradesData)

            const groupedByYear: any[] = gradesData.reduce((sortedBlocks: any, gradeBlock: any) => {
                // separate elements by year in different arrays
                const year = gradeBlock.transaction.year
                sortedBlocks[year] = sortedBlocks[year] ?? [];
                sortedBlocks[year].push(gradeBlock);
        
                return sortedBlocks;
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
        
                    data[element[i]['transaction']['year'] - 1] = element[i]['transaction']['result']
                    sub = {
                        label: element[i]['transaction']['courseName'],
                        borderColor: 'rgb(255, 255, 255)',
                        backgroundColor: backColor,
                        data: data
                    }
                    sum += element[i]['transaction']['result']
                    dataset.push(sub)
                }
        
                means.push(sum/element.length)
            });

            // calulate the total mean of the three years
            means.forEach(function(value) {
                total += value
                count++
            })

            let average = Number(total / count).toFixed(2)

            setGradesChartData((prevState) => ({
                ...prevState,
                dataset,
                average
            }))
        }

        getGrades()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
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
                <Text fontWeight={"bold"} fontSize="2xl"> {gradesChartData.average} </Text>
                <Grid 
                    gap={"20px"} 
                    alignItems={"center"}
                    gridTemplateColumns="repeat(2, 1fr)">
                    <MyChart chartData={gradesChartData}/>
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
                {
                    grades && Object.keys(grades).length !== 0
                    ?
                        <Flex flexDir={"column"}>
                            <Flex overflow={"auto"}>
                                <Table variant="striped" mt={4} >
                                        <Thead>
                                            <Tr>
                                                <Th>Subject</Th>
                                                <Th>Teacher</Th>
                                                <Th isNumeric>Year</Th>
                                                <Th isNumeric>Result</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {grades && (Object.entries(grades).slice(0, 3).map(([key, val]) => (
                                                <Tr key={key} borderBottom={"1px"}>
                                                    <Td>
                                                        <Text fontWeight={"bold"}>{val.transaction.courseName}</Text>
                                                        <Text fontWeight={"thin"}>{val.transaction.date}</Text>
                                                    </Td>
                                                    <Td>{val.transaction.teacher}</Td>
                                                    <Td>{val.transaction.year}</Td>
                                                    <Td>{val.transaction.result}</Td>
                                                </Tr>
                                            )))}
                                        </Tbody>
                                    </Table>
                            </Flex>
                        </Flex>
                    :
                        <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                            <Text textAlign="center">No Latest Grades</Text>
                        </Flex>
                }
            </Flex>
        </>
    );
}

export default Dashboard;