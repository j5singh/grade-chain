import { Avatar, Badge, Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stat, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react"
import { ITransactionGrades } from "../../../models/grades"

function CustomModal({isOpen, onClose, data} : {isOpen: any, onClose: any, data: ITransactionGrades | null}) {
    return (
        <>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='scale'
            >
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                <ModalHeader>
                    {data?.courseName}
                    <Badge ml='3' colorScheme='pink'>
                        {data?.courseCode}
                    </Badge>
                </ModalHeader>
                <ModalCloseButton />
                <Divider orientation='horizontal' variant={"solid"} />
                <ModalBody>
                    <Flex>
                        <Avatar name={data?.teacher} />
                        <Box ml='3'>
                            <Text fontWeight='bold'>
                                {data?.teacher}
                            </Text>
                            <Text fontSize='md'>
                                {data?.courseName}
                                <Badge ml='1' colorScheme='green'>
                                    Year {data?.year}
                                </Badge>
                            </Text>
                        </Box>
                    </Flex>
                    <Divider mt='3' orientation='horizontal' variant={"solid"} />
                    <Flex>
                        <Box mt='3'>
                            <Stat>
                                <StatLabel>Exam Result</StatLabel>
                                <StatNumber>{data?.result}</StatNumber>
                                <StatHelpText>{data?.date}</StatHelpText>
                            </Stat>
                        </Box>
                    </Flex>
                </ModalBody>
                <Divider orientation='horizontal' variant={"solid"} />
                <ModalFooter>
                    <Button colorScheme='blue' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CustomModal