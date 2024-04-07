import { Password } from "@mui/icons-material"
import { Box, Button, IconButton, InputAdornment, Modal, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material"
import { useFormik } from "formik"
import { Password as PasswordIcon, Visibility as ShowIcon, VisibilityOff as NotShowIcon } from "@mui/icons-material"
import * as Yup from "yup"
import React from "react"
import { useActiveAccountMutation } from "../../features/authApi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ActivateForm: React.FC = () => {
    const [password, setPassword] = React.useState<{ old_password: boolean, new_password: boolean, confirm_password: boolean }>({ confirm_password: false, new_password: false, old_password: false })
    const [activateAccount] = useActiveAccountMutation()
    const { uid, token } = useParams()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object().shape({
            old_password: Yup.string().required("Please choose votre current password").min(8, "Please choose un password valide"),
            new_password: Yup.string().required("Please choose un new password").min(8, "Please choose un password valide"),
            confirm_password: Yup.string().required("Veuillez confirmer votre password").oneOf([Yup.ref("new_password")], "Les mots de passe ne correspondent pas")
        }),
        onSubmit: async (values) => {
            try {
                await activateAccount({ uid: uid || "", token: token || "", ...values }).unwrap()
                toast("Account Activated Successfully", { type: "success", position: "top-center", autoClose: 2000 })
                setTimeout(() => navigate("/login"), 2000)
            } catch (error) {
                toast("Something went wrong", { type: "error", position: "top-center", autoClose: 2000 })
            }
        }
    })


    return (
        <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={true}
            onClose={() => { }}
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
                        <Typography id="modal-modal-title" variant="h6" component="h3" textAlign={"center"}>
                            Activate Account
                        </Typography>
                        <TextField id="old_password" value={formik.values.old_password}
                            error={formik.errors.old_password ? true : false}
                            helperText={formik.errors.old_password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange} label="Password"
                            variant="outlined" fullWidth
                            type={password.old_password ? "text" : "password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title={password.old_password ? "Hide password" : "Display password"}>
                                            <IconButton onClick={() => setPassword({ ...password, old_password: !password.old_password })}>
                                                {!password.old_password ? <ShowIcon /> : <NotShowIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }} />
                        <TextField id="new_password" value={formik.values.new_password} error={formik.errors.new_password ? true : false}
                            helperText={formik.errors.new_password}
                            onBlur={formik.handleBlur} onChange={formik.handleChange} label="Password" variant="outlined" fullWidth type={password.new_password ? "text" : "password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title={password.new_password ? "Hide password" : "Display password"}>
                                            <IconButton onClick={() => setPassword({ ...password, new_password: !password.new_password })}>
                                                {!password.new_password ? <ShowIcon /> : <NotShowIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }} />
                        <TextField id="confirm_password" value={formik.values.confirm_password} error={formik.errors.confirm_password ? true : false}
                            helperText={formik.errors.confirm_password}
                            onBlur={formik.handleBlur} onChange={formik.handleChange} label="Password" variant="outlined" fullWidth type={password.confirm_password ? "text" : "password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip title={password.confirm_password ? "Hide password" : "Display password"}>
                                            <IconButton onClick={() => setPassword({ ...password, confirm_password: !password.confirm_password })}>
                                                {!password.confirm_password ? <ShowIcon /> : <NotShowIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }} />
                        <Box>
                            <Button variant="contained" fullWidth onClick={() => formik.handleSubmit()}>
                                Activer votre compte
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
        </Modal >
    )
}
export default ActivateForm;