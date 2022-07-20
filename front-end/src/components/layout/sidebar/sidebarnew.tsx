import { Box, Text, Drawer, DrawerContent, useColorModeValue, BoxProps, Flex, CloseButton, useDisclosure, Icon, Link, FlexProps } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react"
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Constants } from "../../../config/constants";
import { _sidebarItems } from "../../../config/sidebaritems";
import useAuth from "../../../hooks/useAuth";
import MobileNavbar from "../navbar/navbarnew";

export function SidebarNew({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
                <SidebarContent
                    onClose={() => onClose}
                    display={{ base: "none", md: "block" }}
                />
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full"
                >
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                {/* mobilenav */}
                <MobileNavbar onOpen={onOpen} />
                <Box ml={{ base: 0, md: 60 }} p="4">
                    {children}
                </Box>
            </Box>
        </>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const { auth } = useAuth();
    const iconColors = useColorModeValue("pink.600", "pink.200");

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={iconColors}>
                    gradechain.
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {_sidebarItems.map((item) => (
                auth.roles.includes(item.roles) &&
                <NavItem key={item.route} item={item} />
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    item: {
        icon: IconType;
        name: string;
        route: string;
        roles: string;
    };
}

function NavItem({ item }: NavItemProps) {
    const [isActive, setIsActive] = useState(Constants.STUDENT_ROUTES.dashboard);
    const hoverColor = useColorModeValue("pink.200", "pink.600");
    const iconColors = useColorModeValue("pink.600", "pink.200");

    const navigate = useNavigate();
    const location = useLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // This is used so that the isActive class matches with the current route (the highlight on the correct sidebar item)
        if(isActive !== location.pathname) {
            setIsActive(location.pathname)
        }
    })

    function changeRoute(props: any) {
        if (isActive === props.name) return;
        setIsActive(props.route)
        navigate(props.route)
    }

    return (
        <Link
            onClick={() => changeRoute(item)}
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                backgroundColor={isActive === item.route ? hoverColor : ""}
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                fontWeight="600"
                _hover={{backgroundColor: hoverColor}}
            >
                {item.icon && (
                    <Icon
                        mr="4"
                        fontSize={"2xl"}
                        color={iconColors}
                        as={item.icon}
                    />
                )}
                {item.name}
            </Flex>
        </Link>
    );
};