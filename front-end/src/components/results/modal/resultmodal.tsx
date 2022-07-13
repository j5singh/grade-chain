import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Badge, Box, Button, Divider, Flex, Stat, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react"
import { IPendingGrades } from "../../../models/grades"

function ResultModal({isOpen, onClose, onAction, cancelRef, data, modalType} : {isOpen: any, onClose: any, onAction: any, cancelRef: any, data: IPendingGrades | null, modalType: string}) {
    return (
        <>
            <AlertDialog
                motionPreset='scale'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                <AlertDialogHeader>
                    {data?.transaction.courseName}
                    <Badge ml='3' colorScheme='pink'>
                        {data?.transaction.courseCode}
                    </Badge>
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <Divider orientation='horizontal' variant={"solid"} />
                <AlertDialogBody>
                    {
                        modalType === "accept"
                        ? "Are you sure you want to accept the following result?"
                        : "Are you sure you want to decline the following result? Your result will be deleted permanently."
                    }
                    <Divider mt='3' mb='3' orientation='horizontal' variant={"solid"} />
                    <Flex>
                        <Avatar name={data?.transaction.teacher} />
                        <Box ml='3'>
                            <Text fontWeight='bold'>
                                {data?.transaction.teacher}
                            </Text>
                            <Text fontSize='md'>
                                {data?.transaction.courseName}
                                <Badge ml='1' colorScheme='green'>
                                    Year {data?.transaction.year}
                                </Badge>
                            </Text>
                        </Box>
                    </Flex>
                    <Divider mt='3' orientation='horizontal' variant={"solid"} />
                    <Flex>
                        <Box mt='3'>
                            <Stat>
                                <StatLabel>Exam Result</StatLabel>
                                <StatNumber>{data?.transaction.result}</StatNumber>
                                <StatHelpText>{data && new Date((Number(data.transaction.date) * 1e3) + 7200*1e3).toISOString().slice(0, 10)}</StatHelpText>
                            </Stat>
                        </Box>
                    </Flex>
                </AlertDialogBody>
                <Divider orientation='horizontal' variant={"solid"} />
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme={modalType === "accept" ? 'whatsapp' : 'red'} ml={3} onClick={() => onAction(data, modalType)}>
                        {modalType === "accept" ? "Confirm" : "Decline"}
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default ResultModal