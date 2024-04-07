import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import AnimatedBackground from '../components/shared/AnimatedBackgourbd';
import ActivateForm from '../components/Auth/ActivateForm';

const ActivateAccount: React.FC = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" height={"100vh"}>
            <AnimatedBackground />
            <ActivateForm />
        </Grid>
    )
};

export default ActivateAccount;