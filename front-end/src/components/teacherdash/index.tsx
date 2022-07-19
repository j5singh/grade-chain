import { Text, Flex, Heading, Thead, Table, Th, Tbody, Tr, Td, Grid, Button, Box, Container, HStack, SimpleGrid, Tag, VStack, useDisclosure, Divider } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { Constants } from "../../config/constants";
import SkeletonCustom from "../../helpers/skeletoncustom";
import { ICourse } from "../../models/course";
import BookingModal from "../booking/modal/bookingmodal";
import { IExam } from "../../models/exam";
import TeacherModal from "./modal/teachermodal";

function TeacherDashboard() {
    const navigate = useNavigate()
    const { auth } = useAuth()
    const [courses, setCourses] = React.useState<ICourse>()
    const [exams, setExams] = React.useState<IExam>()
    const [ dataForModal, setDataForModal ] = useState<IExam | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        async function getGrades() {
            const response = await fetch('/api/teachingcourses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teacherCode: auth.serialNumber
                }),
            })
            const data = await response.json()
            const coursesData = data.result_data
            setCourses(coursesData)

        }

        async function getExams() {
            const response = await fetch('/api/scheduledexams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teacherCode: auth.serialNumber                    
                }),
            })
            const data = await response.json()
            const examsData = data.result_data
            setExams(examsData)

        }

        getExams()
        getGrades()
    }, [])

    function handleModalClick(data: IExam) {       
        setDataForModal(data)
        onOpen()
    }
    
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
                    <Text fontSize='3xl'>Your courses :</Text>
                </Heading>
                <Container
                    py={8}
                    px={0}
                    maxW='4xl'
                    >
                <SimpleGrid
                    columns={[2, null, 3]}
                    spacing={10}
                >
                    {
                        courses && Object.keys(courses).length !== 0 ?
                            (Object.entries(courses).map(([key, val]) => (
                                <Flex
                                    key={key}
                                    boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                                    justifyContent="space-between"
                                    flexDirection="column"
                                    overflow="hidden"
                                    bg="base.d100"
                                    rounded={5}
                                    flex={1}
                                    p={5}
                                >
                                    <VStack mb={6}>
                                        <Heading
                                            fontSize={{ base: "xl", md: "2xl" }}
                                            textAlign="left"
                                            w="full"
                                            mb={2}
                                        >
                                            {val.courseName}
                                        </Heading>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        > 
                                        </Box>
                                    </VStack>

                                    <Flex justifyContent="space-between">
                                        <HStack spacing={2}>
                                            <Tag size="md" variant="solid" colorScheme="green">
                                                CFU: {val.CFU}
                                            </Tag>
                                            <Tag size="md" variant="solid" colorScheme="green">
                                                Year: {val.year}
                                            </Tag>
                                        </HStack>
                                    </Flex>
                                </Flex>
                            )))
                            : courses && Object.keys(courses).length === 0
                            ? 
                            <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                                <Text textAlign="center">No courses available for booking</Text>
                            </Flex>
                            : <SkeletonCustom />
                    }
                    </SimpleGrid>
                </Container>
                <Divider orientation='horizontal' variant={"solid"} />
                <Heading
                    fontWeight={"normal"}
                    mb={4}
                    letterSpacing="tight"
                    >
                        Your exams
                </Heading>
                <Container
                    py={8}
                    px={0}
                    maxW='4xl'
                    >
                <SimpleGrid
                    columns={[2, null, 3]}
                    spacing={10}
                >
                    {
                        exams && Object.keys(exams).length !== 0 ?
                            (Object.entries(exams).map(([key, val]) => (
                                <Flex
                                    key={key}
                                    boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                                    justifyContent="space-between"
                                    flexDirection="column"
                                    overflow="hidden"
                                    bg="base.d100"
                                    rounded={5}
                                    flex={1}
                                    p={5}
                                >
                                    <VStack mb={6}>
                                        <Heading
                                            fontSize={{ base: "xl", md: "2xl" }}
                                            textAlign="left"
                                            w="full"
                                            mb={2}
                                        >
                                            {val.courseName}
                                        </Heading>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        > 
                                        </Box>
                                    </VStack>

                                    <Flex justifyContent="space-between">
                                        <HStack spacing={2}>
                                            <Tag size="md" variant="solid" colorScheme="green">
                                            {val.examDate && new Date((Number(val.examDate) * 1e3) + 7200*1e3).toISOString().slice(0, 10)}
                                            </Tag>
                                            <Tag size="md" variant="solid" colorScheme="green">
                                                Sub: {val.occurrences}
                                            </Tag>
                                        </HStack>
                                        <Button
                                            colorScheme="teal"
                                            fontWeight="bold"
                                            size="sm"
                                            onClick={() => {handleModalClick(val)}}
                                        >
                                            More
                                        </Button>
                                    </Flex>
                                </Flex>
                            )))
                            : exams && Object.keys(exams).length === 0
                            ? 
                            <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                                <Text textAlign="center">No exams available</Text>
                            </Flex>
                            : <SkeletonCustom />
                    }
                    </SimpleGrid>
                    <TeacherModal isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} data={dataForModal}/>
                </Container>
            </Flex>
        </>
    );
}

export default TeacherDashboard;