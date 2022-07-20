import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Button, Divider, Select, useToast, Box, Flex, HStack } from "@chakra-ui/react"
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { IExam } from "../../../models/exam";

function VerbModal({isOpen, cancelRef, onClose, data} : {isOpen: any, cancelRef: any, onClose: any, data: IExam | null}) {
    const grades = ["ins",18,19,20,21,22,23,24,25,26,27,28,29,30]
    const selectedGrades: Object[] = [];

    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false);
    
    async function handleSubmit(e:any) {
        e.preventDefault();
        setIsLoading(true)  

        if (data?.subscribed.length == selectedGrades.filter(Boolean).length) {
            const response = await fetch('/api/createpending', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    examId: data._id,
                    courseCode: data.courseCode,
                    teacher: data.teacher,
                    teacherCode: data.teacherCode,
                    studentResults: selectedGrades,
                    date: data.examDate
                }),
            })

            const dataRes = await response.json()

            if (dataRes.status === "SUCCESS") {
                toast({
                    title: 'Exam Verbalized!',
                    description: 'Some grades are missing, please fill them up!',                   status: 'success',
                    duration: 4500,
                    isClosable: true,
                    position: 'bottom-right'
                })
            } else {
                toast({
                    title: 'Error',
                    description: 'Something went wrong!',
                    status: 'error',
                    duration: 4500,
                    isClosable: true,
                    position: 'bottom-right'
                })
            }

            onClose()
            
        } else {
            toast({
                title: 'Error',
                description: 'Some grades are missing, please fill them up!',
                status: 'error',
                duration: 4500,
                isClosable: true,
                position: 'bottom-right'
            })
        }
        
        setIsLoading(false)

    }

    function setSelectedGrades(e:any, key: string, sn: string) {
        selectedGrades[parseInt(key)] = {
            student: sn,
            result: e
        }       
    }

    return (
    <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Verbalize the test</ModalHeader>
                <ModalCloseButton />
                <Divider orientation='horizontal' variant={"solid"} />
                <ModalBody>
                    <FormControl>
                        {data?.subscribed && (Object.entries(data.subscribed)).map(([key, val]) => 
                            <>
                                <HStack p={2}>
                                    <Box>{val.serialNumber} - {val.surname}</Box>
                                    <Select
                                        onChange={(e) => {setSelectedGrades(e.target.value, key, val.serialNumber)}}
                                        placeholder='Select Grade'>
                                        {grades.map((item, i) => <option key={i} value={item}>{item}</option>)}
                                    </Select>
                                </HStack>
                            </>
                        )}
                    </FormControl>
                </ModalBody>
                <Divider orientation='horizontal' variant={"solid"} />
                <ModalFooter>
                    <Button ref={cancelRef} mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        // isDisabled={data?.subscribed.length != selectedGrades.filter(Boolean).length}
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

export default VerbModal