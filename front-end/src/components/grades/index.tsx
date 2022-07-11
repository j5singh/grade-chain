import { Badge, Box, Flex, VStack, Heading, HStack, Tag, Button, Container } from "@chakra-ui/react"

export const Grades = () => {

    return (
        <>
            <Container
                py={8}
                px={0}
                maxW='sm'
            >
                <Flex
                    key={1}
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
                            Teoria dei Segnali
                        </Heading>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                            ml='2'
                        > IIET
                        </Box>
                    </VStack>

                    <Flex justifyContent="space-between">
                        <HStack spacing={2}>
                            <Tag size="sm" variant="solid" colorScheme="green">
                                29/30
                            </Tag>
                            <Tag size="sm" variant="outline" colorScheme="cyan">
                                Vannucci
                            </Tag>
                            <Badge
                                borderRadius='full'
                                px='2'
                                colorScheme='teal'
                            > New
                            </Badge>
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
            </Container>
        </>
    )
}
