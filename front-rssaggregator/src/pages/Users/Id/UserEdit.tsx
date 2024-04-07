import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import UserForm from './../../../components/Users/UserForm';
import { useEditUserMutation, useGetUserQuery } from "../../../features/authApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserEdit: React.FC = () => {
    //get param from router
    const { id } = useParams();
    const {data : user, isFetching, isLoading, isSuccess, isError} = useGetUserQuery(Number(id));
    const canDisplay = isSuccess && !isLoading && user !== undefined && user !== null;
    const [editUser] = useEditUserMutation();
    const navigate = useNavigate()
    const handleSubmit = async (values: any) => {
        try {
            const data = await editUser(values).unwrap();
            toast(`L'utilisateur ${data.user_name} a été modifié successfully`, {type: "success", position: "top-center", autoClose: 3000})
            setTimeout(() => {
                navigate(`/management/users/${data.id}/consult/`)
            }, 3000);
            
        } catch (error) {
            toast("Une erreur s'est produite lors de la modification de l'utilisateur", {type: "error", position: "top-center", })
        }
    }
    

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Modifier les informations de l'utilisateur
                    </Typography>
                    {
                        canDisplay && <UserForm mode="EDIT" user={user} onSubmit={handleSubmit} />
                    }
                    {
                        isError && (<Navigate to="404" />)
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default UserEdit;