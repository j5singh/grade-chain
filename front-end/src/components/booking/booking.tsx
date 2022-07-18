import { Container, SimpleGrid, Text, Flex, VStack, Heading, Box, HStack, Tag, Button, useDisclosure, useToast, Divider } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import SkeletonCustom from "../../helpers/skeletoncustom";
import useAuth from "../../hooks/useAuth";
import { IExam } from "../../models/exam";
import BookingModal from "./modal/bookingmodal";

function Booking() {
    const { auth } = useAuth()
    const toast = useToast()

    const [ exams, setExams ] = useState<IExam>()
    const [ isLoading, setIsLoading] = useState(false);
    const [ subscriptions, setSub ] = useState<IExam>()
    const [ dataForModal, setDataForModal ] = useState<IExam | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    
    useEffect(() => {
        getOpenSub() // open subscriptions
        getSub() // student subscriptions

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getOpenSub() {
        const response = await fetch('/api/opensubscriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serialNumber: auth.serialNumber
            }),
        })

        const data = await response.json()
        const examData = data.result_data
        setExams(examData)
    }
    
    async function getSub() {
        const response = await fetch('/api/studentsubscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serialNumber: auth.serialNumber
            }),
        })

        const data = await response.json()
        const subData = data.result_data
        setSub(subData)
    }

    async function bookExam(dataExam: IExam) {
        const examData = dataExam
        setIsLoading(true)
        
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serialNumber: auth.serialNumber,
                exam: examData
            }),
        })

        const data = await response.json()
        if(data.status === "ERROR") {
            toast({
                position: 'bottom-right',
                title: 'An error occured!',
                description: data.result_msg,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        } else {
            toast({
                position: 'bottom-right',
                title: 'Successfully booked the exam!',
                description: data.result_msg,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        }        

        setIsLoading(false)
        getOpenSub() // open subscriptions
        getSub() // student subscriptions
    }

    function handleModalClick(data: IExam) {       
        setDataForModal(data)
        onOpen()
    }

    return (
        <>
            <Flex pl="3%" pt="3%">
                <Heading
                    fontWeight={"normal"}
                    mb={4}
                    letterSpacing="tight"
                    >
                        Bookable Exams
                </Heading>
            </Flex>
            <Divider orientation='horizontal' variant={"solid"} />
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
                                        </HStack>
                                        <Button
                                            colorScheme="teal"
                                            fontWeight="bold"
                                            size="sm"
                                            onClick={() => {handleModalClick(val)}}
                                        >
                                            More
                                        </Button>
                                        <Button
                                            colorScheme="whatsapp"
                                            fontWeight="bold"
                                            size="sm"
                                            isLoading={isLoading}
                                            onClick={() => {bookExam(val)}}
                                        >
                                            Book
                                        </Button>
                                    </Flex>
                                </Flex>
                            )))
                            : exams && Object.keys(exams).length === 0
                            ? 
                            <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                                <Text textAlign="center">No exams available for booking</Text>
                            </Flex>
                            : <SkeletonCustom />
                    }
                </SimpleGrid>
                <BookingModal isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} data={dataForModal}/>
            </Container>
            <Flex pl="3%" pt="3%">
                <Heading
                    fontWeight={"normal"}
                    mb={4}
                    letterSpacing="tight"
                    >
                        Booked Exams
                </Heading>
            </Flex>
            <Divider orientation='horizontal' variant={"solid"} />
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
                        subscriptions && Object.keys(subscriptions).length !== 0 ?
                            (Object.entries(subscriptions).map(([key, val]) => (
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
                                            {val.exam.courseName}
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
                                                {val.exam.examDate && new Date((Number(val.exam.examDate) * 1e3) + 7200*1e3).toISOString().slice(0, 10)}
                                            </Tag>
                                        </HStack>
                                        <Button
                                            colorScheme="teal"
                                            fontWeight="bold"
                                            size="sm"
                                            onClick={() => {handleModalClick(val.exam)}}
                                        >
                                            More
                                        </Button>
                                    </Flex>
                                </Flex>
                            )))
                            : subscriptions && Object.keys(subscriptions).length === 0
                            ? 
                            <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                                <Text textAlign="center">No booked exams to show</Text>
                            </Flex>
                            : <SkeletonCustom />
                    }
                </SimpleGrid>
                <BookingModal isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} data={dataForModal}/>
            </Container>
        </>
    )
}

export default Booking;

