import { Text, Flex, Heading, Box, SimpleGrid, Tag, VStack, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import SkeletonCustom from "../../helpers/skeletoncustom";
import { ICourse } from "../../models/course";

function TeacherDashboard() {
    const { auth } = useAuth()

    const [courses, setCourses] = useState<ICourse>()

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
        getGrades()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
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
                <Divider orientation='horizontal' variant={"solid"} />
                <Text fontSize='3xl'>Your courses</Text>
                <Flex
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
                                            <Tag size="md" variant="solid" colorScheme="green">
                                                CFU: {val.CFU}
                                            </Tag>
                                            <Tag size="md" variant="solid" colorScheme="green">
                                                Year: {val.year}
                                            </Tag>
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
                </Flex>
            </Flex>
        </>
    );
}

export default TeacherDashboard;