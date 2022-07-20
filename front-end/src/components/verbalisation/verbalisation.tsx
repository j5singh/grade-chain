import { Text, Flex, Heading, Box, SimpleGrid, Tag, VStack, Button, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import SkeletonCustom from "../../helpers/skeletoncustom";
import { IExam } from "../../models/exam";
import VerbModal from "./modal/verbmodal";

function Verbalisation() {
    const [dataForModal, setDataForModal] = useState<IExam | null>(null)
    const { isOpen , onOpen, onClose } = useDisclosure()
    const { auth } = useAuth()
    const cancelRef = useRef()
    const [exams, setExams] = useState<IExam>()

    useEffect(() => {
        getExams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getExams() {
        const response = await fetch('/api/scheduledexams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                teacherCode: auth.serialNumber,
                verbalize: true
            }),
        })
        const data = await response.json()
        const examsData = data.result_data
        setExams(examsData)
    }

    function handleModalClick(data: IExam) {       
        setDataForModal(data)
        onOpen()
    }

    function onCloseVerb() {
        onClose()
        getExams()
    }
    
    return (
        <>
            <Flex flexDir={"column"} p="3%">
                <Heading
                    fontWeight={"normal"}
                    mb={4}
                    letterSpacing="tight"
                >
                    Finished exams
                    <Text fontSize='xl'>Click on verbalize to assign results</Text>
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
                                                onClick={() => {handleModalClick(val)}}
                                            >
                                                Verbalize
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
            <VerbModal isOpen={isOpen} cancelRef={cancelRef} onClose={onCloseVerb} data={dataForModal}/>
        </>
    )
}

export default Verbalisation;