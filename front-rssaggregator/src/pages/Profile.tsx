import React, { useState } from 'react';
import { Tabs, Tab, Box, TextField, Container, Grid, Paper, Typography, Divider, Stack, InputLabel } from '@mui/material';
import UserForm from '../components/Users/UserForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import { useUpdateProfileMutation } from '../features/authApi';
import { IUser } from '../types/entities';
import ChangeEmailForm from '../components/Users/ChangeEmailForm';
import ChangePasswordForm from '../components/Users/ChangePasswordForm';
import DeleteProfileForm from '../components/Users/DeleteProfileForm';
import { toast } from 'react-toastify';

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Profile: React.FC = () => {
    const [form, setForm] = useState<string>("CONSULT")
    const [editProfile] = useUpdateProfileMutation();
    const [activeTab, setActiveTab] = useState(0);
    const user = useSelector(selectUser)

    const handleTabChange = (event: React.SyntheticEvent, tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    const handleSubmit = async (values: IUser) => {
        if (form === "CONSULT") {
            setForm("EDIT")
        } else {
            try {
                const result = await editProfile(values).unwrap()
                toast("Profile Update successfully", { type: "success", autoClose: 2000 })
                setForm("CONSULT")
            } catch (error) {
                toast("Something went wrong", { type: "error", autoClose: 2000 })
            }
        }
    }




    return (
        <Container maxWidth="xl">
            <Paper>
                <Typography variant="h4" component="h1" padding={4}>{`Profil de ${user?.user_name}`}</Typography>
                <Divider />
                <Grid container>
                    <Grid item xs={3} sx={{ minHeight: "70vh" }}>
                        <Tabs orientation='vertical' color='primary' value={activeTab} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Tab label="Informations Personnelles" onClick={(e) => handleTabChange(e, 0)} {...a11yProps(0)} />
                            <Divider />
                            <Tab label="Changer adresse mail" onClick={(e) => handleTabChange(e, 2)} {...a11yProps(1)} />
                            <Divider />
                            <Tab label="Changer password" onClick={(e) => handleTabChange(e, 4)} {...a11yProps(2)} />
                            <Divider />
                            <Tab label="Supprimer le profil" onClick={(e) => handleTabChange(e, 6)} {...a11yProps(2)} />
                        </Tabs>
                        <Divider />
                    </Grid>
                    <Grid item xs={9}>
                        <Box padding={4} sx={{ width: "100%" }}>
                            {
                                activeTab === 0 && Boolean(user) && (<UserForm mode={form} user={user ? user : undefined} onSubmit={handleSubmit} />)
                            }
                            {
                                activeTab === 2 && (
                                    <ChangeEmailForm changeTab={handleTabChange} />
                                )
                            }
                            {
                                activeTab === 4 && (<ChangePasswordForm />)
                            }
                            {
                                activeTab === 6 && (<DeleteProfileForm />)
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

        </Container>
    );
};

export default Profile;