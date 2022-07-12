import { Avatar, Box, Flex, Menu, MenuButton, MenuList, useColorMode, Text, MenuItem, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
    const { toggleColorMode } = useColorMode();
    const [theme, toggleTheme] = useState(false);
    const { isAuthenticated, auth, doLogout } = useAuth()
    
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("black", "white");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const fullName = auth.name.concat(" ", auth.surname)

    return (
        <>
            {
                isAuthenticated && <Flex
                    pos={"fixed"}
                    right="1rem"
                    top="1rem"
                    align="center"
                >
                    <Box
                        cursor={"pointer"}
                        onClick={() => {
                            toggleColorMode();
                            toggleTheme(!theme);
                        }} 
                    >
                        {theme ? <FaMoon /> : <FaSun />}
                    </Box>
                    <Box
                        paddingLeft={3}>
                        <Menu>
                            <MenuButton p='0px'>
                                <Avatar
                                    _hover={{ cursor: "pointer" }}
                                    color="gray.700"
                                    name={fullName}
                                    bg="gray.100"
                                    size='sm'
                                />
                            </MenuButton>
                            <MenuList
                                boxShadow={shadow}
                                p='0px'
                                mt='10px'
                                borderRadius='20px'
                                bg={menuBg}
                                border='none'>
                                <Flex w='100%' mb='0px'>
                                    <Text
                                        ps='20px'
                                        pt='16px'
                                        pb='10px'
                                        w='100%'
                                        borderBottom='1px solid'
                                        borderColor={borderColor}
                                        fontSize='sm'
                                        fontWeight='700'
                                        color={textColor}>
                                            👋&nbsp; Hey, {auth.name}
                                    </Text>
                                </Flex>
                                <Flex flexDirection='column' p='10px'>
                                    <MenuItem
                                        _hover={{ bg: "none" }}
                                        _focus={{ bg: "none" }}
                                        color='red.400'
                                        borderRadius='8px'
                                        px='14px'
                                        onClick={doLogout}>
                                        <Text fontSize='sm'>Log out</Text>
                                    </MenuItem>
                                </Flex>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            }
        </>
    )
}

export default Navbar