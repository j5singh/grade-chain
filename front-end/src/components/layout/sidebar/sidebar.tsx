import { Flex, Heading, Icon, Link, useColorModeValue, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { FiAlertTriangle, FiBookOpen, FiHome } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function Sidebar() {
    const [isActive, setIsActive] = useState("/dashboard");

    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const navBarColor = useColorModeValue("#020202", "gray.700");

    const sidebarItems = [
        {
            name: "Home",
            icon: FiHome,
            route: "/dashboard"
        },
        {
            name: "Grades",
            icon: FiBookOpen,
            route: "/grades"
        },
        {
            name: "Results",
            icon: FiAlertTriangle,
            route: "/results"
        }
    ];

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
        <>
        {
            isAuthenticated && <Flex
                w={["100%", "100%", "10%", "15%", "15%"]}
                flexDir="column"
                alignItems="center"
                backgroundColor={navBarColor}
                color="white"
                paddingLeft={2}
            >
                <Flex
                    flexDir={"column"}
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir={"column"}
                        as="nav"
                    >
                        <Heading
                            mt={50}
                            mb={[25, 50, 100]}
                            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl",]}
                            alignSelf={"center"}
                            letterSpacing="tight"
                        >
                            Grade Chain
                        </Heading>
                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            {
                                sidebarItems.map((item, i) => {
                                    return [
                                        <Flex key={i} className="sidebar-items" mr={[2, 6, 0, 0, 0]} onClick={() => changeRoute(item)}>
                                            <Link display={["none", "none", "flex", "flex", "flex"]}>
                                                <Icon as={item.icon} fontSize="2xl" className={isActive === item.route ? "active-icon" : ""} />
                                            </Link>
                                            <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                                <Text className={isActive === item.route ? "active" : ""}>{item.name}</Text>
                                            </Link>
                                        </Flex>
                                    ]
                                })
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        }
        </>
    )
}

export default Sidebar