import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Button, Divider } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";

function NewExamModal({isOpenExam, onCloseExam} : {isOpenExam: any, onCloseExam: any}) {
    const [openingDate, setOpeningDate] = useState(new Date());
    const [closingDate, setClosingDate] = useState(new Date());
    const [examDate, setExamDate] = useState(new Date());
    
    return (
        <>
            <Modal isOpen={isOpenExam} onClose={onCloseExam}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new exam</ModalHeader>
                    <ModalCloseButton />
                    <Divider orientation='horizontal' variant={"solid"} />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Booking Opening</FormLabel>
                            <SingleDatepicker
                                name="opening-input"
                                date={openingDate}
                                onDateChange={setOpeningDate}/>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Booking Closing</FormLabel>
                            <SingleDatepicker
                                name="closing-input"
                                date={closingDate}
                                onDateChange={setClosingDate}/>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Exam Date</FormLabel>
                            <SingleDatepicker
                                name="date-input"
                                date={examDate}
                                onDateChange={setExamDate}/>
                        </FormControl>
                    </ModalBody>
                    <Divider orientation='horizontal' variant={"solid"} />
                    <ModalFooter>
                        <Button mr={3} onClick={onCloseExam}>
                            Cancel
                        </Button>
                        <Button colorScheme='teal'>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewExamModal