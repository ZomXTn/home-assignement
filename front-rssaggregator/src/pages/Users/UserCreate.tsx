import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import UserForm from "../../components/Users/UserForm";
import { useRegisterMutation } from "../../features/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        try {
            const data = await register(values).unwrap();
            toast(`L'utilisateur ${data.user_name} a été invité successfully`, { type: "success", position: "top-center", autoClose: 3000 })
            setTimeout(() => {
                navigate(`/management/users/${data.id}/consult/`)
            }, 3000);

        } catch (error) {
            toast("Une erreur s'est produite lors de l'invitation de l'utilisateur", { type: "error", position: "top-center", })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Inviter un Utilisateur
                    </Typography>
                    <UserForm mode="CREATE" onSubmit={handleSubmit} />
                </Stack>
            </Paper>
        </Container>
    );
};

export default Registration;