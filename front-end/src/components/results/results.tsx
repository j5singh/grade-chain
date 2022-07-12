import { Box, Flex, VStack, Heading, HStack, Tag, Button, Container } from "@chakra-ui/react"
import React from "react"
import { useEffect, useState } from "react"
import SkeletonCustom from "../../helpers/skeletoncustom"
import useAuth from "../../hooks/useAuth"
import IGrades from "../../models/grades"
import IPendingGrades from "../../models/grades"

export const Results = () => {
    const { auth } = useAuth()
    const [prendingGrades, setPendingGrades] = useState<IPendingGrades>()
    const [isLoading, setIsLoading] = React.useState(false);

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
            timestamp: timestamp }
    }

    useEffect(() => {
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

        getPendingGrades()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function acceptGrade(e:any) {  
        const pendGrade = e   
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
                
        if (prevHash.length == 64) {
            const { hashHex, timestamp } = await hash(prevHash, pendGrade)

            console.log(pendGrade);
            
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
        }

        setIsLoading(false)
    }

    async function declineGrade(e:any) {
        e.preventDefault();

        setIsLoading(true)
        // do something in here
        // const response = await doLogin(email, password);
        // setError(response)
        console.log("declining");
        setIsLoading(false)
        
        // if (response.status === "SUCCESS") {
        //     navigate("/dashboard", { replace: true })
        // }
    }

    return (
        <>
            <Container
                py={8}
                px={0}
                maxW='sm'
            >
                {
                    prendingGrades ?
                        (Object.entries(prendingGrades).map(([key, val]) => (
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
                                    </HStack >
                                    <HStack spacing={2}>
                                        <Button
                                            colorScheme="teal"
                                            fontWeight="bold"
                                            size="sm"
                                            isLoading={isLoading}
                                            onClick={() => acceptGrade(val)}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            colorScheme="teal"
                                            fontWeight="bold"
                                            size="sm"
                                            isLoading={isLoading}
                                            onClick={declineGrade}
                                        >
                                            Decline
                                        </Button>
                                    </HStack>
                                </Flex>
                            </Flex>
                        )))
                        : <SkeletonCustom />
                }
            </Container>
        </>
    )
}
