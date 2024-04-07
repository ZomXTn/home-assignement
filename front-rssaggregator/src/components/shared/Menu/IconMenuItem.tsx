import { ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface IconMenuItemProps extends PropsWithChildren {
    label: string, 
    onClick: () => void
}
const IconMenuItem: React.FC<IconMenuItemProps> = ({ label, children, onClick }) => {
    return (
        <MenuItem onClick={onClick}>
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={label}></ListItemText>
        </MenuItem>
    )
}

export default IconMenuItem;