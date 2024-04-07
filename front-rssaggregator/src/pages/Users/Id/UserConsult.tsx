import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import UserForm from './../../../components/Users/UserForm';
import { useGetUserQuery } from "../../../features/authApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const UserConsult: React.FC = () => {
    const { id } = useParams();
    const { data: user, isFetching, isLoading, isSuccess, isError } = useGetUserQuery(Number(id));
    const canDisplay = isSuccess && !isLoading && user !== undefined && user !== null;
    const navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        navigate(`/management/users/${id}/edit/`);
    }


    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Consulter les informations de l'utilisateur
                    </Typography>
                    {
                        canDisplay && <UserForm mode="CONSULT" user={user} onSubmit={handleSubmit} />
                    }
                    {
                        isError && (<Navigate to="404" />)
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default UserConsult;