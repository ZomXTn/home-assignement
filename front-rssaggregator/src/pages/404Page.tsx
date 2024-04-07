import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            minHeight="85vh"
        >
            <Stack direction="column" alignItems="baseline" justifyContent="center" gap={2} sx={{ maxWidth: "20%" }} marginRight={1}>
                <Typography variant="h2" component="h1">
                    Whoops!
                </Typography>
                <Typography variant="h5" component="h2">
                    404 Page Not Found
                </Typography>
                <Typography variant="body1">
                    It seems the page you are looking for is not available at the moment
                </Typography>
                <Typography variant="body1">
                   Please verify the URL or go back to homepage
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                >
                    Go to Homepage
                </Button>
            </Stack>
            <Box
                component="img"
                src="/404.png" // You should place your image in the public folder or import it.
                alt="Page Not Found"
                sx={{ width: 450, mb: 4, borderRadius: 2, boxShadow: 2, border: 10, borderColor: "#F5F5F5" }}
            />
        </Box>
    );
};

export default NotFoundPage;
