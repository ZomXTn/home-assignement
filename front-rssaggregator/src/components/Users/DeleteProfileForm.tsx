import React, { useState } from 'react';
import {
    Box,
    Stack,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
} from '@mui/material';
import { Password, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useDeleteProfileMutation } from '../../features/authApi';
import { toast } from 'react-toastify';

const DeleteProfileForm: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [deleteProfile] = useDeleteProfileMutation();

    const handleSubmit = async () => {
        try {
            await deleteProfile({ current_password: currentPassword }).unwrap();
            toast("Profil supprimé successfully", { type: 'success', position: "top-center", autoClose: 2000 });
        } catch (error) {
            toast("Une erreur est survenu lors de la suppression du profil", { type: 'error', position: "top-center", autoClose: 2000 });
        }
    }

    return (
        <Box width="100%" display="flex" justifyContent="center">
            <Stack width="50%" direction="column" gap={2}>
                <Typography variant="h5" component="h2" textAlign="center">
                    Changer password
                </Typography>
                <Typography variant="body1" component="p" textAlign="center">
                    Attention ! la suppression de votre profil est irréversible, vous perdrez toutes vos données
                </Typography>
                <Typography variant="body1" component="p" textAlign="center">
                    Pour confirmer la suppression de votre profil, veuillez entrer votre current password
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="current_password"
                    label="current password"
                    name="current_password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Password />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge="end">
                                    {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="outlined" fullWidth color='error' onClick={handleSubmit}>
                    Supprimer le profil
                </Button>
            </Stack>
        </Box>
    );
};

export default DeleteProfileForm;