import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { grey } from "@mui/material/colors"
import { Link } from 'react-router-dom';

//side bar component
interface ISidebarTabProps {
    label: string,
    path: string,
    icon: JSX.Element,
    active: boolean,
    open: boolean
}

const SidebarTab: React.FC<ISidebarTabProps> = ({ label, path, icon, active, open }) => {
    return (
        <ListItem disablePadding sx={{ display: 'block', color : "inherit", ...(active && { bgcolor : grey[300] }) }} component='a' href={path} >
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    )
}

export default SidebarTab;