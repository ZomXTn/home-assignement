import { Grid } from "@mui/material"
import AnimatedBackground from "../components/shared/AnimatedBackgourbd";
import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { selectIsAuthenticated } from "../slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  
  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center" height={"100vh"}>
        <AnimatedBackground />
      </Grid>
      <LoginForm />
    </React.Fragment>

  )
}

export default Login;