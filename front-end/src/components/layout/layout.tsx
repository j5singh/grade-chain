import { Box, Flex } from "@chakra-ui/react"
import { ReactElement } from "react"
import useAuth from "../../hooks/useAuth";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";

function Layout({children} : {children: ReactElement}) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        <Flex>
                            {/* SideBar */}
                            <Sidebar />
                            <Box flex={6}>
                                {/* Navbar (top) */}
                                <Navbar />
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