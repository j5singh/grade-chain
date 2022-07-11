import { Box, Flex, VStack, Heading, HStack, Tag, Button, Container } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SkeletonCustom from "../../helpers/skeletoncustom"
import useAuth from "../../hooks/useAuth"
import IGrades from "../../models/grades"

export const Grades = () => {
    const { auth } = useAuth()
    const [grades, setGrades] = useState<IGrades>()

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

    return (
        <>
            <Container
                py={8}
                px={0}
                maxW='sm'
            >
                {
                    grades ?
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
                                    >
                                        More
                                    </Button>
                                </Flex>
                            </Flex>
                        )))
                        : <SkeletonCustom />
                }
            </Container>
        </>
    )
}
