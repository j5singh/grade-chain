import { Flex } from "@chakra-ui/react"
import { ReactElement } from "react"
import useAuth from "../../hooks/useAuth";
import Navbar from "./navbar/navbar"
import Sidebar from "./sidebar/sidebar"

function Layout({children} : {children: ReactElement}) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        {/* Navbar (top) */}
                        <Navbar />
                        <Flex
                            h={[null, null, "100vh"]}
                            maxW="2000px"
                            flexDir={["column", "column", "row"]}
                            overflow="hidden"
                        >
                            {/* SideBar */}
                            <Sidebar />
                            {/* Main Center Page */}
                            {children}
                        </Flex>
                    </>
                ) : children
            }
        </>
    )
}

export default Layout