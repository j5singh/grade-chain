import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Badge, Box, Button, Divider, Flex, Stat, StatHelpText, StatLabel, Text } from "@chakra-ui/react"
import { IExam } from "../../../models/exam"

function BookingModal({isOpen, onClose, cancelRef, data} : {isOpen: any, onClose: any, cancelRef: any, data: IExam | null}) {
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
                    {data?.courseName}
                    <Badge ml='3' colorScheme='pink'>
                        {data?.courseCode}
                    </Badge>
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <Divider orientation='horizontal' variant={"solid"} />
                <AlertDialogBody>
                    <Flex>
                        <Avatar name={data?.teacher} />
                        <Box ml='3'>
                            <Text fontWeight='bold'>
                                {data?.teacher}
                            </Text>
                            <Text fontSize='md'>
                                {data?.courseName}
                            </Text>
                        </Box>
                    </Flex>
                    <Divider mt='3' orientation='horizontal' variant={"solid"} />
                    <Flex>
                        <Box mt='3'>
                            <Stat>
                                <StatLabel>Exam Info</StatLabel>
                                <StatHelpText>{data && new Date((Number(data.examDate) * 1e3) + 7200*1e3).toISOString().slice(0, 10)}</StatHelpText>
                            </Stat>
                        </Box>
                    </Flex>
                </AlertDialogBody>
                <Divider orientation='horizontal' variant={"solid"} />
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        OK
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default BookingModal