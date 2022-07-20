import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Error } from '../../models/error';
import useAuth from '../../hooks/useAuth';
import { Constants } from '../../config/constants';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setError] = useState<Error>();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { doRegister } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e:any) {
        e.preventDefault();

        setIsLoading(true)
        const response = await doRegister(name, surname, email, password);
        setError(response)
        setIsLoading(false)
        
        if (response.status === "SUCCESS") {
            navigate(Constants.AUTH_ROUTES.login, { replace: true })
        }
    }

    function handleName(nameNew: string) {
        setName(nameNew)
        setEmail(nameNew.toLowerCase() + "." + surname.toLowerCase() + "@studenti.unipr.it")
    }

    function handleSurname(surnameNew: string) {
        setSurname(surnameNew)
        setEmail(name.toLowerCase() + "." + surnameNew.toLowerCase() + "@studenti.unipr.it")
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" onChange={(e) => handleName(e.target.value)}/>
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName" isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" onChange={(e) => handleSurname(e.target.value)}/>
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={isLoading}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link as={ReactLink} to="/auth/login" color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                        { errors && errors.result_msg && errors.status === "ERROR" &&
                            <Box pt={3}>                        
                                <Alert 
                                    status='error'
                                    variant='left-accent'
                                >
                                    <AlertIcon />
                                    <Box>
                                        <AlertTitle>{errors.status}!</AlertTitle>
                                        <AlertDescription>{errors.result_msg}</AlertDescription>
                                    </Box>
                                </Alert>
                            </Box>
                        }
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Register;