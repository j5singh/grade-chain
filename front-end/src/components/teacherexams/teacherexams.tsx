import { Box, Button, Divider, Flex, Heading, SimpleGrid, Tag, useDisclosure, VStack, Text, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import SkeletonCustom from "../../helpers/skeletoncustom"
import useAuth from "../../hooks/useAuth"
import { IExam } from "../../models/exam"
import NewExamModal from "./modal/newexam"

function TeacherExams() {
    const { isOpen: isOpenExam , onOpen: onOpenExam, onClose: onCloseExam } = useDisclosure()

    const { auth } = useAuth()
    const [exams, setExams] = useState<IExam>()

    useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            <Flex flexDir={"column"} p="3%">
                <Flex alignItems={"center"} justifyContent="flex-end">
                    <Button fontWeight={"bold"} leftIcon={<FaPlus />} variant={"solid"} colorScheme="pink" size={"sm"} onClick={onOpenExam} >
                        New Exam
                    </Button>
                </Flex>
                <Divider mt={3} mb={2} orientation='horizontal' variant={"solid"} />
                <Heading
                    fontWeight={"normal"}
                    mb={4}
                    letterSpacing="tight"
                >
                    Your Scheduled Exams
                </Heading>
                <Flex>
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
                                            <Tooltip hasArrow label='Exam date' fontSize='sm'>
                                                <Tag size="md" variant="solid" colorScheme="green">
                                                    {val.examDate && new Date((Number(val.examDate) * 1e3) + 7200*1e3).toISOString().slice(0, 10)}
                                                </Tag>
                                            </Tooltip>
                                            <Tooltip hasArrow label='Registered students' fontSize='sm'>
                                                <Tag size="md" variant="solid" colorScheme="green">
                                                    Sub: {val.occurrences}
                                                </Tag>
                                            </Tooltip>
                                            <Button
                                                colorScheme="teal"
                                                fontWeight="bold"
                                                size="xs"
                                                onClick={() => {}}
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
                </Flex>
            </Flex>
            <NewExamModal isOpenExam={isOpenExam} onCloseExam={onCloseExam} />
        </>
    )
}

export default TeacherExams