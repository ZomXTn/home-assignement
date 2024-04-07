import { Avatar, Box, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { DRAWER_WIDTH } from "../../constants";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { deepPurple, grey } from "@mui/material/colors";
import TopbarMenu from "./Menu/TopbarMenu";
import { selectUser } from "../../slices/authSlice";
import { useSelector } from "react-redux";


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface TopbarProps {
    open: boolean
    handleDrawerOpen: () => void
}
const firsLetters = (firstName: string, lastName: string) => {
    return firstName?`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}` : ""
}
// topbar comonent 
const Topbar: React.FC<TopbarProps> = ({ open, handleDrawerOpen }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const menuOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const user = useSelector(selectUser);
    return (<AppBar position="fixed" open={open}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Box flexGrow={1} display="flex" justifyContent="space-between" alignItems={"center"}>
                <Typography variant="h4" component="h1">RSS Aggregator</Typography>
                <Box>
                    <IconButton
                        size="small" aria-controls={menuOpen ? 'account-menu' : undefined}
                        aria-haspopup="menu"
                        aria-expanded={menuOpen ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar sx={{
                            bgcolor: deepPurple[300],
                            ...(menuOpen && {
                                border: 2,
                                borderColor: grey[400]
                            })
                        }}>{firsLetters(user?.first_name || "", user?.last_name || "")}</Avatar>
                    </IconButton>
                </Box>
            </Box>
            <TopbarMenu user={user} anchorEl={anchorEl} open={menuOpen} handleClose={handleCloseMenu} />
        </Toolbar>
    </AppBar>)
}

export default Topbar