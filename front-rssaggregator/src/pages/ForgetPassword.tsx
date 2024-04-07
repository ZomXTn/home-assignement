import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useForgotPasswordMutation } from '../features/authApi';
import { toast } from 'react-toastify';
import { Button, TextField, Container, Typography, Paper, Box, Grid, Modal, Stack } from '@mui/material';
import AnimatedBackground from '../components/shared/AnimatedBackgourbd';

const ForgetPassword: React.FC = () => {
    const [forgetPassword] = useForgotPasswordMutation();
    const validationSchema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await forgetPassword(values).unwrap();
                toast("Password reset link sent successfully", { type: 'success', position: "top-center", autoClose: 2000 });
            } catch (error) {
                toast("An error occurred while sending the password reset link", { type: 'error', position: "top-center", autoClose: 2000 });
            }
        },
    });

    return (
        <Grid container justifyContent="center" alignItems="center" height={"100vh"}>
            <AnimatedBackground />
            <Modal
                open={true}
                onClose={() => { }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                disableEscapeKeyDown
                disableAutoFocus
            >
                <Box width={{
                    xs: "90vw",
                    md: "70vw",
                    lg: "25vw"
                }}>
                    <Paper>
                        <Stack direction={"column"} sx={{
                            padding: {
                                xs: 2,
                                lg: 4
                            }
                        }}
                            gap={3}>
                            <Typography component="h1" variant="h5">
                                Forget Password
                            </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => formik.handleSubmit()}
                            >
                                Send Password Reset Link
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </Grid>
    );
};

export default ForgetPassword;