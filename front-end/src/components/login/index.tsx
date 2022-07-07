import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, Heading, Input, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaPaperPlane, FaSun } from 'react-icons/fa';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import User from '../../models/user';

interface Error {
    result_data: any,
    result_msg: string,
    status: string
}

function Login() {
    const { toggleColorMode } = useColorMode();
    const [theme, toggleTheme] = React.useState(false);
    const [email, setEmail] = React.useState("lorenzio.cipelli@studenti.unipr.it");
    const [password, setPassword] = React.useState("san benedetto");
    const [errors, setError] = React.useState<Error>()
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e:any) {
        e.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "ERROR") {
                setError(data)
            } else {
                let parseObj:User = data.result_data
                setAuth({
                    name: parseObj.name,
                    surname: parseObj.surname,
                    email: parseObj.email,
                    roles: parseObj.roles,
                    token: parseObj.token,
                    password: parseObj.password
                })
                navigate("/dashboard")
            }
        });
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
                        onClick={handleSubmit}> Log In
                    </Button>
                    { errors && errors.result_msg
                        ?
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
                        </Box> : null
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
                        {theme ? <FaMoon /> : <FaSun />}
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}

export default Login;