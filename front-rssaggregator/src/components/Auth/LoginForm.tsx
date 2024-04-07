import { AlternateEmail as EmailIcon, Password as PasswordIcon, Visibility as ShowIcon, VisibilityOff as NotShowIcon } from "@mui/icons-material";
import { Modal, Box, Paper, Stack, Typography, Button, TextField, InputAdornment, IconButton, Tooltip, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { useLoginMutation } from "../../features/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ICredentials {
    email: string,
    password: string
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        } as ICredentials,
        onSubmit: (values) => handleSubmit(values),
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Please choose une adresse valide").required("Please choose une adresse valide").min(1, "Please choose votre email"),
            password: Yup.string().required("Please choose un password valide").min(8, "Please choose votre Password")
        })
    })
    const handleShowPassword = () => {
        setShowPassword(actual => !actual);
    }
    const handleSubmit = async ({ email, password }: ICredentials) => {
        try {
            const data = await login({ email, password }).unwrap()
            toast(`Authentification Réussie`, { type: "success", position: "top-center", autoClose: 2000 })
            setTimeout(() => navigate("/articles"), 2000)
        } catch (error) {
            toast("Une erreur s'est produite lors de l'authentification", { type: "error", position: "top-center", autoClose: 2000 })
        }
    }
    return (
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
                            Sign In
                        </Typography>

                        <TextField label="Email" variant="outlined" fullWidth type="email"
                            id="email" value={formik.values.email} error={formik.errors.email ? true : false} onChange={formik.handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }} />
                        {formik.errors.email && (
                            <FormHelperText error sx={{
                                textAlign: "center"
                            }}>{formik.errors.email}</FormHelperText>
                        )}
                        <TextField id="password" value={formik.values.password} error={formik.errors.password ? true : false} onBlur={formik.handleBlur} onChange={formik.handleChange} label="Password" variant="outlined" fullWidth type={showPassword ? "text" : "password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title={showPassword ? "Hide password" : "Display password"}>
                                            <IconButton onClick={handleShowPassword}>
                                                {!showPassword ? <ShowIcon /> : <NotShowIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }} />
                        {formik.errors.password && (
                            <FormHelperText error sx={{
                                textAlign: "center"
                            }}>
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                            <Link to="/resend-activation" ><Typography variant="caption" textAlign="center"> New Activation Link?</Typography></Link>
                            <Link to="/forgot-password"><Typography variant="caption" textAlign="center">forget password?</Typography></Link>
                        </Stack>
                        <Button disabled={isLoading} variant="contained" type="submit" onClick={() => formik.handleSubmit()}>S'Authentifier</Button>
                    </Stack>
                </Paper >
            </Box >
        </Modal >
    )
}

export default LoginForm