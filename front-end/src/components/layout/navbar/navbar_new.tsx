import { Avatar, Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

function NavbarNew() {
    const { toggleColorMode } = useColorMode();
    const [theme, toggleTheme] = useState(false);
    const { auth, doLogout } = useAuth()
    
    let menuBg = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("black", "white");
    const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
    const shadow = useColorModeValue(
        "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
        "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
    );
    const fullName = auth.name.concat(" ", auth.surname)
    
    return (
        <Flex
            alignItems={"center"}
            fontSize="14px"
            borderBottom={"2px solid rgb(231, 228, 228)"}
            height="50px"
        >
            <Flex
                width={"100%"}
                padding="20px"
                alignItems={"center"}
                justifyContent="end"
            >
                <Flex
                    alignItems={"center"}
                >
                    <Flex
                        alignItems={"center"}
                        marginRight="20px"
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
                    </Flex>
                    <Flex
                        alignItems={"center"}
                    >
                        <Box
                            paddingLeft={3}
                        >
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
                </Flex>
            </Flex>
        </Flex>
    )
}

export default NavbarNew