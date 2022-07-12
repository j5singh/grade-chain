import { Box, Flex, Link, UnorderedList, Text, useColorModeValue, Icon, ListItem } from "@chakra-ui/react"
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { MdDashboard, MdSchool, MdOutlineLaptopChromebook } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"

function SidebarNew() {
    const [isActive, setIsActive] = useState("/dashboard");
    
    const navigate = useNavigate();
    const location = useLocation();

    const iconColors = useColorModeValue("pink.600", "pink.200");
    const hoverColor = useColorModeValue("pink.200", "pink.600");

    const sidebarItems = [
        {
            paragraphName: "MAIN",
            subItems: [
                {
                    icon: MdDashboard,
                    name: "Dashboard",
                    route: "/dashboard"
                }
            ]
        },
        {
            paragraphName: "SERVICES",
            subItems: [
                {
                    icon: MdSchool,
                    name: "Grades",
                    route: "/grades"
                },
                {
                    icon: MdOutlineLaptopChromebook,
                    name: "Results",
                    route: "/results"
                }
            ]
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
            <Box
                flex={1}
                minHeight="100vh"
                borderRight={"2px solid rgb(230, 227, 227)"}
            >
                {/* Top */}
                <Flex
                    height={"50px"}
                    alignItems="center"
                    justifyContent={"center"}
                    borderBottom={"2px solid rgb(230, 227, 227)"}
                >
                    <Link style={{ textDecoration: "none" }}>
                        <Box as="span"
                            fontSize={"20px"}
                            fontWeight="bold"
                            color={iconColors}
                        >
                            gradechain.
                        </Box>
                    </Link>
                </Flex>
                {/* Center */}
                <Box paddingLeft={"10px"}>
                    <UnorderedList
                        listStyleType={"none"}
                        margin="0"
                        padding={"0"}
                    >
                        {
                            sidebarItems.map((item, i) => {
                                return (
                                    <Fragment key={item.paragraphName}>
                                        <Text
                                            key={item.paragraphName}
                                            fontSize={"10px"}
                                            fontWeight="bold"
                                            marginTop={"15px"}
                                            marginBottom="5px"
                                        >
                                            {item.paragraphName}
                                        </Text>
                                        {item.subItems.map((item, i) => {
                                            return (
                                                <Fragment key={item.route}>
                                                    <ListItem
                                                        backgroundColor={isActive === item.route ? hoverColor : ""}
                                                        onClick={() => changeRoute(item)}
                                                        display={"flex"}
                                                        alignItems="center"
                                                        padding={"5px"}
                                                        cursor="pointer"
                                                        _hover={{backgroundColor: hoverColor}}
                                                    >
                                                        <Icon as={item.icon} fontSize={"2xl"} color={iconColors} />
                                                        <Box
                                                            as="span"
                                                            fontSize={"1xl"}
                                                            fontWeight="600"
                                                            marginLeft={"10px"}
                                                        >
                                                            {item.name}
                                                        </Box>
                                                    </ListItem>
                                                </Fragment>
                                            )
                                        })}
                                    </Fragment>
                                )
                            })
                        }
                    </UnorderedList>
                </Box>
            </Box>
        </>
    )
}

export default SidebarNew