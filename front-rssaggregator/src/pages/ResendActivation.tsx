import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Grid, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { useResendActivationMutation } from '../features/authApi';
import { toast } from 'react-toastify';
import AnimatedBackground from '../components/shared/AnimatedBackgourbd';

const ResendActivation: React.FC = () => {
    const [resendActivation] = useResendActivationMutation();
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
                await resendActivation(values).unwrap();
                toast("Lien d'activation envoyé successfully", { type: 'success' , position: "top-center", autoClose: 2000 });
            } catch (error) {
                toast("Une erreur s'est produite lors de l'envoi du lien d'activation", { type: 'error' , position: "top-center", autoClose: 2000 });
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
                            <Typography id="modal-modal-title" variant="h5" component="h2" textAlign={"center"}>
                                RSS Aggregator
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h3" textAlign={"center"}>
                                S'Authentifier
                            </Typography>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <Button type="submit" variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
                                Resend Activation Link
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </Grid>
    );
};

export default ResendActivation;