import { ReactElement } from "react"
import useAuth from "../../hooks/useAuth";
import { SidebarNew } from "./sidebar/sidebarnew";

function Layout({children} : {children: ReactElement}) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {
                isAuthenticated ? <SidebarNew>{children}</SidebarNew> : children
            }
        </>
    )
}

export default Layout