import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, Heading, Input, Stack, Switch, Text, Link, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaPaperPlane, FaSun } from 'react-icons/fa';
import React, { ChangeEvent } from 'react';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Constants } from '../../config/constants';
import { Error } from '../../models/error';

function Login() {
    const [theme, toggleTheme] = React.useState(false);
    const [email, setEmail] = React.useState("lorenzo.cipelli@studenti.unipr.it");
    const [password, setPassword] = React.useState("san benedetto");
    const [errors, setError] = React.useState<Error>();
    const [isLoading, setIsLoading] = React.useState(false);

    const formBackground = useColorModeValue("gray.100", "gray.700");
    
    const { toggleColorMode } = useColorMode();
    const { doLogin } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e:any) {
        e.preventDefault();

        setIsLoading(true)
        const response = await doLogin(email, password);
        setError(response)
        setIsLoading(false)
        
        if (response.status === "SUCCESS") {
            if (response.result_data.roles.includes("student"))
                navigate(Constants.STUDENT_ROUTES.dashboard, { replace: true })
            else
                navigate(Constants.TEACHER_ROUTES.dashboard, { replace: true })
        }
    }

    function loginMode(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setEmail("marco.locatelli@unipr.it")
            setPassword("san benedetto")
        } else {
            setEmail("lorenzo.cipelli@studenti.unipr.it")
            setPassword("san benedetto")
        }
    }

    return (
        <>
            <Flex
                height={"100vh"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Flex
                    direction={"column"}
                    background={formBackground}
                    p={12}
                    rounded={6}
                    position={"relative"}
                >
                    <Heading mb={"6"}>Log In</Heading>
                    <Input 
                        placeholder='Email' 
                        variant={"outline"} 
                        mb={3}
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Input 
                        placeholder='Password' 
                        variant={"outline"} 
                        mb={6} 
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Button 
                        rightIcon={<FaPaperPlane />} 
                        colorScheme={"teal"}
                        onClick={handleSubmit}
                        isLoading={isLoading}> Log In
                    </Button>
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
                    <Box
                        position={"absolute"}
                        top={2}
                        right={2}
                        cursor={"pointer"}
                        onClick={() => {
                            toggleColorMode();
                            toggleTheme(!theme);
                        }} 
                    >
                        <Flex justifyContent={"space-between"} alignItems="center">
                            {theme ? <FaMoon /> : <FaSun />}
                            <Text ml={2}>Mode: </Text>
                            <Switch ml={1} size='sm' onChange={loginMode}/>
                        </Flex>
                    </Box>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Not registered yet? <Link as={ReactLink} to="/auth/register" color={'blue.400'}>Register now</Link>
                        </Text>
                    </Stack>
                </Flex>
            </Flex>
        </>
    );
}

export default Login;