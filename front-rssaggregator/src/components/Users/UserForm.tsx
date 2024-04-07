import { Box, Button, Grid, InputAdornment, InputLabel, Menu, MenuItem, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IUser } from '../../types/entities';
import { useLocation } from 'react-router-dom';
import { algorithmsMap } from '../../constants';

interface IIUserFormProps {
    user?: IUser,
    onSubmit: (values: IUser) => void
    mode: string
}

enum UserFormType {
    CREATE = "CREATE",
    EDIT = "EDIT",
    CONSULT = "CONSULT"
}

const UserForm: React.FC<IIUserFormProps> = ({ user, onSubmit, mode }) => {
    const validationSchema = Yup.object({
        user_name: Yup.string().required('Un Last name d\'utilisateur est requis'),
        email: Yup.string().email('Enter a valid email').required('Une adresse mail est requise'),
        first_name: Yup.string().required('Un First name est requis'),
        last_name: Yup.string(),
        phone_number: Yup.string()
            .matches(
                /^0[1-9](?:[ _.-]?[0-9]{2}){4}$/,
                'Veuillez entrez un numéro de téléphone français valide'
            ),
        adress: Yup.string(),
        algorithm: Yup.string()
    });
    const initialValues: IUser = {
        user_name: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        adress: '',
        algorithm: 'alg1'
    }
    const formik = useFormik({
        initialValues: user ? user : initialValues,
        validationSchema: validationSchema,
        onSubmit
    });

    const location = useLocation()
    const hide = location.pathname === "/profile"

    return (
        <Grid container justifyContent="space-between" alignItems="center" rowGap={2} columnGap={1} alignContent="center">
            <Grid item xs={12}>
                <TextField disabled={mode == UserFormType.CONSULT}
                    required
                    fullWidth
                    id="user_name"
                    label="Username"
                    name="user_name"
                    autoComplete="user_name"
                    autoFocus
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.user_name)}
                    helperText={formik.errors.user_name}
                />
            </Grid>
            {
                !hide && (
                    <Grid item xs={12}>
                        <TextField disabled={mode == UserFormType.CONSULT}
                            required
                            fullWidth
                            id="email"
                            label="Adresse Email"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}
                        />
                    </Grid>
                )
            }
            <Grid item xs={5}>
                <TextField disabled={mode == UserFormType.CONSULT}
                    fullWidth
                    required
                    name="first_name"
                    label="First name"
                    type="text"
                    id="first_name"
                    autoComplete="first_name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.first_name)}
                    helperText={formik.errors.first_name}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField disabled={mode == UserFormType.CONSULT}

                    fullWidth
                    name="last_name"
                    label="Last name de famille"
                    type="text"
                    id="last_name"
                    autoComplete="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.last_name)}
                    helperText={formik.errors.last_name}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField disabled={mode == UserFormType.CONSULT}

                    fullWidth
                    name="phone_number"
                    label="Numéro de téléphone"
                    type="text"
                    id="phone_number"
                    autoComplete="phone_number"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.phone_number)}
                    helperText={formik.errors.phone_number}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField disabled={mode == UserFormType.CONSULT}
                    fullWidth
                    name="adress"
                    label="Adresse"
                    type="text"
                    id="adress"
                    autoComplete="adress"
                    value={formik.values.adress}
                    onChange={formik.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon />
                            </InputAdornment>
                        ),
                    }}
                    error={Boolean(formik.errors.adress)}
                    helperText={formik.errors.adress}
                />
            </Grid>
            {mode != UserFormType.CREATE && !hide && (
                <React.Fragment>
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="space-evenly" alignItems="center" width="100%">
                                <InputLabel>Activer l'utilisateur</InputLabel>
                                <Switch checked={formik.values.is_active} disabled={mode == UserFormType.CONSULT} onChange={(_, checked) => formik.setFieldValue("is_active", checked)} />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" justifyContent="space-evenly" alignItems="center" width="100%">
                                <InputLabel>Administrateur?</InputLabel>
                                <Switch checked={formik.values.is_staff} disabled={mode == UserFormType.CONSULT} onChange={(_, checked) => formik.setFieldValue("is_staff", checked)} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField disabled={mode == UserFormType.CONSULT}
                            fullWidth
                            name="algorithm"
                            label="Algorithme"
                            type="text"
                            id="algorithm"
                            select
                            autoComplete="algorithm"
                            value={formik.values.algorithm}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.algorithm)}
                            helperText={formik.errors.algorithm}>
                            {
                                Array.from(algorithmsMap).map(([key, value]) => (
                                    <MenuItem key={key} value={key}>{value}</MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>
                </React.Fragment>
            )}

            < Grid item xs={12}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => formik.handleSubmit()}
                >
                    {mode == UserFormType.CREATE && "Inviter utilisateur"}
                    {mode == UserFormType.CONSULT && "Modifier les informations"}
                    {mode == UserFormType.EDIT && "Valider les modifications"}
                </Button>
            </Grid>

        </Grid >

    );
};

export default UserForm;