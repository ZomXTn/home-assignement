import { Email as EmailIcon, Password as PasswordIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import React from 'react';
import { Stack, Typography, TextField, Box, Button, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useChangeEmailMutation } from '../../features/authApi';
import { toast } from 'react-toastify';

const ChangeEmailForm: React.FC<{ changeTab: (event: React.SyntheticEvent, tabIndex: number) => void }> = ({ changeTab }) => {
    const validationSchema = yup.object({
        new_email: yup.string().email('Invalid email').required('Email is required'),
        re_new_email: yup.string().email('Invalid email').required('Email is required').oneOf([yup.ref('new_email')], 'Emails must match'),
        current_password: yup.string().required('Password is required')
    })
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
    const [changeEmail] = useChangeEmailMutation();
    const formik = useFormik({
        initialValues: {
            new_email: '',
            re_new_email: '',
            current_password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await changeEmail(values).unwrap();
                toast("Adresse mail changée", { type: 'success', position: "top-center", autoClose: 2000 });
                setTimeout(() => {
                    changeTab({} as React.SyntheticEvent, 0)
                }, 2100);
            } catch (error) {
                toast("Erreur lors du changement d'adresse mail", { type: 'error', position: "top-center", autoClose: 2000 });
            }
        }
    })

    return (
        <Box width="100%" display="flex" justifyContent="center">
            <Stack width="50%" direction="column" gap={2}>
                <Typography variant="h5" component="h2" textAlign={"center"}>Changer adresse mail</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Nouvelle adresse mail"
                    InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
                    margin='dense'
                    name="new_email"
                    value={formik.values.new_email}
                    onChange={formik.handleChange}
                    error={formik.touched.new_email && Boolean(formik.errors.new_email)}
                    helperText={formik.touched.new_email && formik.errors.new_email}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Confirmer adresse mail"
                    InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /> </InputAdornment> }}
                    name="re_new_email"
                    value={formik.values.re_new_email}
                    onChange={formik.handleChange}
                    error={formik.touched.re_new_email && Boolean(formik.errors.re_new_email)}
                    helperText={formik.touched.re_new_email && formik.errors.re_new_email}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="current_password"
                    label="current password"
                    name="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formik.values.current_password}
                    onChange={formik.handleChange}
                    error={formik.touched.current_password && Boolean(formik.errors.current_password)}
                    helperText={formik.touched.current_password && formik.errors.current_password}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <PasswordIcon />
                            </InputAdornment>,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    edge="end"
                                >
                                    {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant='contained' fullWidth onClick={() => formik.handleSubmit()}>Changer adresser mail</Button>
            </Stack >
        </Box>
    );
};

export default ChangeEmailForm;