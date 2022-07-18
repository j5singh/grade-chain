import { Box, Flex, Text, VStack, Heading, HStack, Tag, Button, Container, SimpleGrid, useDisclosure, Divider } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SkeletonCustom from "../../helpers/skeletoncustom"
import useAuth from "../../hooks/useAuth"
import { IGrades, ITransactionGrades } from "../../models/grades"
import CustomModal from "./modal/modal"

export const Grades = () => {
    const { auth } = useAuth()
    const [grades, setGrades] = useState<IGrades>()
    const [dataForModal, setDataForModal] = useState<ITransactionGrades | null>(null)

    const { isOpen, onOpen, onClose } = useDisclosure()

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
            setGrades(data.result_data as IGrades)
        }

        getGrades()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleModalClick(data: ITransactionGrades) {
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
                    Grades
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
                        grades && Object.keys(grades).length !== 0 ?
                            (Object.entries(grades).map(([key, val]) => (
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
                                        </HStack>
                                        <Button
                                            colorScheme="teal"
                                            fontWeight="bold"
                                            size="sm"
                                            onClick={() => {handleModalClick(val.transaction)}}
                                        >
                                            More
                                        </Button>
                                    </Flex>
                                </Flex>
                            )))
                            : grades && Object.keys(grades).length === 0
                            ? 
                            <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
                                <Text textAlign="center">No grades to show</Text>
                            </Flex>
                            : <SkeletonCustom />
                    }
                </SimpleGrid>
                <CustomModal isOpen={isOpen} onClose={onClose} data={dataForModal}/>
            </Container>
        </>
    )
}
