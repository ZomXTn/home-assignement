import { Box, CssBaseline } from "@mui/material"
import React from "react";
import { useState } from "react";
import Topbar from "./Topbar";
import { Sidebar, DrawerHeader } from "./SidebarDrawer";
import { useGetProfileQuery } from "../../features/authApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";


// Layout component for all the pages
const Layout: React.FC<React.PropsWithChildren<{ adminOnly?: boolean }>> = ({ children, adminOnly }) => {
    const [open, setOpen] = useState(false);
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const { data: profile, isSuccess, isLoading } = useGetProfileQuery()
    const location = useLocation()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (isAuthenticated === false) {
        return <Navigate to="/" />
    }

    return (
        <Box component="header" sx={{ display: 'flex', bgcolor: "#F5F5F5" }} minHeight={"100vh"} >
            <CssBaseline />
            {
                isSuccess && profile && (<React.Fragment>
                    <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />
                    <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        {
                            adminOnly && profile.is_staff === false ? <Navigate to="/" replace={true} /> : <React.Fragment>
                                <DrawerHeader />
                                {children}</React.Fragment>
                        }
                    </Box>
                </React.Fragment>)
            }
        </Box >
    )
}

export default Layout