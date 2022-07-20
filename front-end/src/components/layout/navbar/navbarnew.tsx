import { useColorModeValue, Flex, IconButton, HStack, Menu, MenuButton, Avatar, VStack, Box, MenuList, MenuItem, Text, FlexProps, useColorMode, MenuDivider } from "@chakra-ui/react";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

function MobileNavbar({ onOpen, ...rest }: MobileProps) {
    const iconColors = useColorModeValue("pink.600", "pink.200");
    const { toggleColorMode } = useColorMode();
    const [theme, toggleTheme] = useState(false);

    const { auth, doLogout } = useAuth()
    const fullName = auth.name.concat(" ", auth.surname)

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                color={iconColors}
            >
                gradechain.
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={theme ? <FaMoon /> : <FaSun />}
                    onClick={() => {
                        toggleColorMode();
                        toggleTheme(!theme);
                    }}
                />
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar
                                    _hover={{ cursor: "pointer" }}
                                    color="gray.700"
                                    name={fullName}
                                    size={"sm"}
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">{fullName}</Text>
                                    <Text fontSize="xs" color="gray.600" fontFamily="monospace">
                                        {(auth.roles).toUpperCase()}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <MenuItem>👋&nbsp; Hey, {auth.name}</MenuItem>
                            <MenuDivider></MenuDivider>
                            <MenuItem onClick={doLogout}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
}

export default MobileNavbar