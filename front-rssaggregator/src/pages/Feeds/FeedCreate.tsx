import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useCreateFeedMutation } from "../../features/feedsApi";
import FeedForm from "../../components/Feeds/FeedForm";
import { IFeed } from "../../types/entities";
import { FormModes } from "../../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FeedCreate: React.FC = () => {
    const [createFeed] = useCreateFeedMutation();
    const navigate = useNavigate();
    const handleSubmit = async (values: IFeed) => {
        try {
            const data = await createFeed(values).unwrap();
            toast(`Rss Feed ${data.name} created successfully`, { type: "success", position: "top-center", autoClose: 3000 })
            setTimeout(() => {
                navigate(`/management/feeds/${data.feed_id}/consult/`)
            }, 3000);
        } catch (error) {
            toast("Something went wrong", { type: "error", position: "top-center" })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Create Rss Feed
                    </Typography>
                    <FeedForm mode={FormModes.CREATE} onSubmit={handleSubmit} />
                </Stack>
            </Paper>
        </Container>
    );
};

export default FeedCreate;