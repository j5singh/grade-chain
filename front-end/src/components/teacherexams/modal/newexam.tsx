import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Button, Divider, Select, useToast } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";
import { INewExam } from "../../../models/exam";

function NewExamModal({isOpenExam, cancelRef, onCloseExam, data} : {isOpenExam: any, cancelRef: any, onCloseExam: any, data: INewExam | null}) {
    const [openingDate, setOpeningDate] = useState(new Date());
    const [closingDate, setClosingDate] = useState(new Date());
    const [examDate, setExamDate] = useState(new Date());
    const [selectedExam, setSelectedExam] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast()

    async function handleSubmit(e:any) {
        e.preventDefault();
        setIsLoading(true)

        const od = Math.floor((new Date(openingDate).getTime() / 1000) + 7200).toFixed(0)
        const cd = Math.floor((new Date(closingDate).getTime() / 1000) + 7200).toFixed(0)
        const ed = Math.floor((new Date(examDate).getTime() / 1000) + 7200).toFixed(0)       

        const response = await fetch('/api/createexam', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serialNumber: data?.serialNumber,
                bookOpening: od, 
                bookClosing: cd,
                teacher: data?.surname,
                courseCode: selectedExam,
                examDate: ed    
            }),
        })

        const data_res = await response.json()
        
        setIsLoading(false)

        if(data_res.status !== "ERROR") {
            toast({
                title: 'Exam Created!',
                status: 'success',
                duration: 4500,
                isClosable: true,
                position: 'bottom-right'
            })
            onCloseExam()
        } else {
            toast({
                title: 'Error',
                description: data_res.result_msg,
                status: 'error',
                duration: 4500,
                isClosable: true,
                position: 'bottom-right'
            })
        }
    }
    
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
                            <FormLabel>Course</FormLabel>
                            <Select 
                                placeholder='Select option'
                                onChange={(e) => {setSelectedExam(e.target.value)}}
                            >
                                {data?.courses && (Object.entries(data.courses)).map(([key, val]) => <option key={key} value={val.courseCode}>{val.courseName} - {val.courseCode}</option>)}
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
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
                        <Button ref={cancelRef} mr={3} onClick={onCloseExam}>
                            Cancel
                        </Button>
                        <Button
                            isDisabled={selectedExam === ""}
                            colorScheme='teal'
                            isLoading={isLoading} 
                            onClick={handleSubmit}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewExamModal