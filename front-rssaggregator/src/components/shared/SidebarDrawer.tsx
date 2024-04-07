import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Feed, Favorite, History, AddOutlined, People, ArticleOutlined } from '@mui/icons-material';
import { DRAWER_WIDTH } from '../../constants';
import SidebarTab from './Sidebar/SidebarTab';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/authSlice';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface SidebarProps {
    open: boolean
    handleDrawerClose: () => void
}

interface ITab {
    label: string,
    path: string,
    icon: JSX.Element
}

const Sidebar: React.FC<SidebarProps> = ({ handleDrawerClose, open }) => {
    const currentLocation = useLocation()
    const theme = useTheme();
    const user = useSelector(selectUser)
    const userTabs: ITab[] = [
        {
            label: "RSS Feeds Management",
            path: "/feeds",
            icon: <Feed />
        },
        {
            label: "Recent Articles",
            path: "/articles",
            icon: <ArticleOutlined />
        },
        {
            label: "Favorites",
            path: "/favorites",
            icon: <Favorite />
        },
        {
            label: "History",
            path: "/history",
            icon: <History />
        },
    ]
    const adminTabs: ITab[] = [
        {
            label: "User Management",
            path: "/management/users",
            icon: <People />
        },
        {
            label: "Articles Management",
            path: "/management/articles",
            icon: <ArticleOutlined />
        },
        {
            label: "RSS Feeds Management",
            path: "/management/feeds",
            icon: <Feed />
        },
    ]

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {userTabs.map((tab, index) => (
                    <SidebarTab key={index} label={tab.label} path={tab.path} icon={tab.icon} active={tab.path === currentLocation.pathname} open={open} />
                ))}
            </List>
            {
                user && user.is_staff && (
                    <React.Fragment>
                        {
                            open ? (<Divider>Administration</Divider>) : <Divider />
                        }
                        <List>
                            {adminTabs.map((tab, index) => (
                                <SidebarTab key={index} label={tab.label} path={tab.path} icon={tab.icon} active={tab.path === currentLocation.pathname} open={open} />
                            ))}
                        </List>
                    </React.Fragment>)
            }
        </Drawer>
    );
}


export { Sidebar, DrawerHeader };