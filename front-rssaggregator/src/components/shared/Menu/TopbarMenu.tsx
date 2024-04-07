import { Menu, Box, Stack, Typography, Divider } from "@mui/material"
import IconMenuItem from "./IconMenuItem"
import { ManageAccounts as EditIcon, Logout as LogoutIcon } from "@mui/icons-material"
import { useLogoutMutation } from "../../../features/authApi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface TopbarMenuProps {
    open: boolean,
    handleClose: () => void,
    anchorEl: HTMLElement | null,
    user: any
}

const TopbarMenu: React.FC<TopbarMenuProps> = ({ open, anchorEl, handleClose, user }) => {
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            toast("Signout Successful", { type: "success", autoClose: 2000, position: "top-center" })
        } catch (e) {
            toast("Something went wrong", { type: "error", autoClose: 2000 })
        }
        handleClose() // Close the menu after logout
    }

    const handleProfile = () => {
        navigate("/profile") // Navigate to the profile page
        handleClose() // Close the menu after navigation
    }

    return (
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}  >
            <Box minWidth={200}>
                <Stack direction="column" alignItems="center" spacing={2} padding={2}>
                    <Typography>{user?.email}</Typography>
                    <Typography variant="h6" textAlign="center">{`Bonjour ${user?.first_name} ${user?.last_name} !`}</Typography>
                </Stack>
            </Box>
            <Divider />
            <IconMenuItem onClick={handleProfile} label="Manage my account" ><EditIcon /></IconMenuItem>
            <IconMenuItem onClick={handleLogout} label="Sign Out" ><LogoutIcon /></IconMenuItem>
        </Menu>
    )
}

export default TopbarMenu