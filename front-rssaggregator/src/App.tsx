import { Box, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import AnimatedBackground from './components/shared/AnimatedBackgourbd';
import Carousel from './components/PartnersSlides';

export default function App() {
  return (
    <Grid container justifyContent="center" alignItems="center" height={"100vh"}>
      <AnimatedBackground />
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
          xs: "40vw",
        }}>
          <Paper>
            <Stack direction={"column"} sx={{
              padding: {
                xs: 2,
                lg: 4
              }
            }}
              gap={3}>
              <Typography id="modal-modal-description" variant="body1" component="p" textAlign={"center"}>
                This site was created as part of a project in order to get my diploma of M2 SID
              </Typography>
              <Typography id="modal-modal-description" variant="body1" component="p" textAlign={"center"}>
                The purpose of this platform is to allow users to consult the latest news in real-time using RSS Feeds.
              </Typography>
              <Typography id="modal-modal-description" variant="body1" component="p" textAlign={"center"}>
                If you have an account, please <a href='/login'>log in</a> to access the platform. Otherwise, please contact an administrator to obtain an account.
              </Typography>
            </Stack>
          </Paper>
        </Box>

      </Modal>
    </Grid>
  );
}
