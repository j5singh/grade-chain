import { Box, Button, Flex, Heading, Input, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaPaperPlane, FaSun } from 'react-icons/fa';
import React from 'react';

function App() {
  const { toggleColorMode } = useColorMode();
  const [theme, toggleTheme] = React.useState(false);

  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Flex direction={"column"}
        background={formBackground}
        p={12}
        rounded={6}
        position={"relative"}
        >
          <Heading mb={"6"}>Log In</Heading>
          <Input placeholder='Email' variant={"outline"} mb={3} type={"email"}/>
          <Input placeholder='Password' variant={"outline"} mb={6} type={"password"}/>
          <Button rightIcon={<FaPaperPlane />} colorScheme={"teal"}>
            Log In
          </Button>

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

export default App;
