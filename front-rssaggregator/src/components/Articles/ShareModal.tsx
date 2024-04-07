import { Modal, Box, Paper, Stack, Typography, TextField, MenuItem, Button } from "@mui/material"
import { Facebook, LinkedIn, Twitter, Reddit, Email } from "@mui/icons-material"
interface IShareModalProps {
    open: boolean
    handleClose(): void
    setValue(value: string | null): void
    value: string | null
}
const ShareModal: React.FC<IShareModalProps> = ({ open, handleClose, setValue, value }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
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
                            Partager un Article
                        </Typography>
                        <TextField select label="Plateforme" value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setValue(event.target.value);
                        }}>
                            <MenuItem value={"twitter"}> <Stack direction="row" alignItems="center"><Twitter sx={{ marginRight: 2 }} /> Twitter</Stack></MenuItem>
                            <MenuItem value={"facebook"}> <Stack direction="row" alignItems="center"><Facebook sx={{ marginRight: 2 }} /> FaceBook</Stack></MenuItem>
                            <MenuItem value={"linkedin"}> <Stack direction="row" alignItems="center"><LinkedIn sx={{ marginRight: 2 }} /> LinkedIn</Stack></MenuItem>
                            <MenuItem value={"reddit"}><Stack direction="row" alignItems="center"><Reddit sx={{ marginRight: 2 }} /> Reddit</Stack></MenuItem>
                            <MenuItem value={"email"}><Stack direction="row" alignItems="center"><Email sx={{ marginRight: 2 }} /> Email</Stack></MenuItem>
                        </TextField>
                        <Button variant="contained" onClick={handleClose}>Partager</Button>
                    </Stack>
                </Paper>
            </Box>
        </Modal>
    )
}

export default ShareModal;