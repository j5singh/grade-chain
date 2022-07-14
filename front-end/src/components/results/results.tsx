import { Text, Box, Flex, VStack, Heading, HStack, Tag, Button, Container, useDisclosure, useToast, SimpleGrid } from "@chakra-ui/react"
import { useRef } from "react"
import { useEffect, useState } from "react"
import SkeletonCustom from "../../helpers/skeletoncustom"
import useAuth from "../../hooks/useAuth"
import { IPendingGrades } from "../../models/grades"
import ResultModal from "./modal/resultmodal"

interface IResponse {
    status: string,
    result_msg: string,
    result_data: {}
}

export const Results = () => {
    const { auth } = useAuth()
    const toast = useToast()
    
    const [pendingGrades, setPendingGrades] = useState<IPendingGrades>()
    const [isLoading, setIsLoading] = useState(false);
    const [dataForModal, setDataForModal] = useState<IPendingGrades | null>(null)
    const [modalType, setModalType] = useState("accept")

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    async function hash(pHash: string, pendGrade: IPendingGrades) {
        const timestamp = Date.now() + 7200*1e3 // Center Europe time zone
        const text = '{ previousHash: ' + String(pHash) + ', timestamp: ' + String(timestamp) + 
        ', nonce: ' + String(pendGrade?.nonce) + ', merkleRoot: ' + String(pendGrade?.merkleRoot) + ' }'

        const encoder = new TextEncoder();
        const toHash = encoder.encode(text)
        const hash = await crypto.subtle.digest('SHA-256', toHash);
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');

        return {
            hashHex: hashHex,
            timestamp: timestamp 
        }
    }

    useEffect(() => {
        getPendingGrades()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function acceptGrade(data: IPendingGrades) {
        const pendGrade = data
        setIsLoading(true)

        async function getPreviousHash() {
            const response = await fetch('/api/lasthash', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            })
            const data = await response.json()

            return data.result_data.hash
        }

        const prevHash = await getPreviousHash()        

        if (prevHash.length === 64) {
            const { hashHex, timestamp } = await hash(prevHash, pendGrade)
            // block creation
            const response = await fetch('/api/registergrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    digest: hashHex,
                    previousHash: prevHash,
                    timestamp: timestamp,
                    pendingGrade: pendGrade
                }),
            })
            const data = await response.json() as IResponse
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
                    title: 'Result accepted!',
                    description: data.result_msg,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            }
        }

        setIsLoading(false)
        getPendingGrades()
    }

    async function declineGrade(dataToDecline: IPendingGrades) {
        const pendGrade = dataToDecline
        setIsLoading(true)

        const response = await fetch('/api/deletepending', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pendingGrade: pendGrade
            }),
        })

        const data = await response.json() as IResponse
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
                title: 'Result declined!',
                description: data.result_msg,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        }

        setIsLoading(false)
        getPendingGrades()
    }

    async function getPendingGrades() {
        const response = await fetch('/api/gradespending', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serialNumber: auth.serialNumber
            }),
        })
        const data = await response.json()
        
        setPendingGrades(data.result_data as IPendingGrades)
    }

    function openResultModal(data: IPendingGrades, type: string) {
        setModalType(type)
        setDataForModal(data)
        onOpen()
    }

    async function onAction(dataToProcess: IPendingGrades, modalType: string) {
        onClose()
        if (modalType === "accept") {
            acceptGrade(dataToProcess)
        } else if (modalType === "decline") {
            declineGrade(dataToProcess)
        }
    }

    return (
        <>
            <Container
                py={8}
                px={0}
                maxW='5xl'
            >
                <SimpleGrid
                    columns={[2, null, 3]}
                    spacing={10}
                >
                    {
                        pendingGrades && Object.keys(pendingGrades).length !== 0 ?
                            (Object.entries(pendingGrades).map(([key, val]) => (
                                <Flex
                                    key={key}
                                    boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                                    justifyContent="space-between"
                                    flexDirection="column"
                                    alignItems={"center"}
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
                                        >
                                            {val.transaction.courseName}
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
                                            <Tag size="md" variant="outline" colorScheme="cyan">
                                                Year {val.transaction.year}
                                            </Tag>
                                            <Tag size="md" variant="solid" colorScheme="green">
                                                {val.transaction.result}/30
                                            </Tag>
                                        </HStack >
                                    </Flex>
                                    <Flex mt={3} alignItems={"center"} justifyContent="space-between">
                                        <HStack spacing={2}>
                                            <Button
                                                colorScheme="whatsapp"
                                                fontWeight="bold"
                                                size="sm"
                                                isLoading={isLoading}
                                                onClick={() => openResultModal(val, "accept")}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                colorScheme="red"
                                                fontWeight="bold"
                                                size="sm"
                                                isLoading={isLoading}
                                                onClick={() => openResultModal(val, "decline")}
                                            >
                                                Decline
                                            </Button>
                                        </HStack>
                                    </Flex>
                                </Flex>
                            )))
                            : pendingGrades && Object.keys(pendingGrades).length === 0
                            ? 
                            <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                                <Text textAlign="center">No Results waiting for action</Text>
                            </Flex>
                            : <SkeletonCustom />
                    }
                </SimpleGrid>
            </Container>
            <ResultModal isOpen={isOpen} onClose={onClose} onAction={onAction} cancelRef={cancelRef} data={dataForModal} modalType={modalType} />
        </>
    )
}
