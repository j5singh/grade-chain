import { Box, Flex } from "@chakra-ui/react"
import { ReactElement } from "react"
import useAuth from "../../hooks/useAuth";
import NavbarNew from "./navbar/navbar_new";
import SidebarNew from "./sidebar/sidebar_new";

function Layout({children} : {children: ReactElement}) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        <Flex>
                            {/* SideBar */}
                            <SidebarNew />
                            <Box flex={6}>
                                {/* Navbar (top) */}
                                <NavbarNew />
                                {/* Main Center Page */}
                                {children}
                            </Box>
                        </Flex>
                    </>
                ) : children
            }
        </>
    )
}

export default Layout