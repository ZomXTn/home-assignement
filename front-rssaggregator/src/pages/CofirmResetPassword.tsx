import { Grid, Modal, Box, Paper, Stack, Typography, Button, TextField } from '@mui/material';
import React from 'react';
import AnimatedBackground from '../components/shared/AnimatedBackgourbd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmPasswordMutation } from '../features/authApi';
import { toast } from 'react-toastify';

const ConfirmResetPassword: React.FC = () => {
    const { uid, token } = useParams()
    const [confirmPassword] = useConfirmPasswordMutation();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            new_password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            new_password: Yup.string()
                .required('New password is required')
                .min(8, 'Password is too short - should be 8 chars minimum.'),
            confirm_password: Yup.string()
                .required('Password confirmation is required')
                .oneOf([Yup.ref('new_password')], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            try {
                const { new_password } = values
                await confirmPassword({ uid: uid || "", token: token || "", new_password }).unwrap()
                toast("password réinitiliasé successfully", { type: 'success', position: "top-center", autoClose: 2000 });
                setTimeout(() => {
                    navigate("/login")
                }, 2100);
            } catch (error) {
                toast("Une erreur est survenu lors de la réinitialisation du password", { type: 'error', position: "top-center", autoClose: 2000 });
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
                            spacing={1}
                        >
                            <Typography id="modal-modal-title" variant="h5" component="h2" textAlign={"center"}>
                                RSS Aggregator
                            </Typography>
                            <Typography id="modal-modal-title" variant="h6" component="h3" textAlign={"center"}>
                                Confirmer votre changement de password
                            </Typography>
                            <TextField
                                name="new_password"
                                type="password"
                                label="New Password"
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                helperText={formik.touched.new_password && formik.errors.new_password}
                            />
                            <TextField
                                name="confirm_password"
                                type="password"
                                label="Confirm Password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                            />
                            <Button variant='contained' onClick={() => formik.handleSubmit()}>Submit</Button>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </Grid>
    );
};

export default ConfirmResetPassword;