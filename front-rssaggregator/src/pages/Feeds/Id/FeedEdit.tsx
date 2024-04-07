import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedForm from "../../../components/Feeds/FeedForm";
import { IFeed } from "../../../types/entities";
import { useGetFeedQuery, useUpdateFeedMutation } from "../../../features/feedsApi";
import { FormModes } from "../../../types/types";
import { toast } from "react-toastify";

const FeedEdit: React.FC = () => {
    const { id } = useParams();
    const { data: feed, isLoading, isFetching, isSuccess, isError } = useGetFeedQuery(id || "")
    const canDisplay = isSuccess && !isLoading && Boolean(feed);
    const [updateFeed] = useUpdateFeedMutation();
    const navigate = useNavigate();
    const handleSubmit = async (values: IFeed) => {
        try {
            const data = await updateFeed(values).unwrap();
            toast(`Rss Feed ${data?.name} a été modifié successfully`, { type: "success", position: "top-center", autoClose: 3000 })
            setTimeout(() => {
                navigate(`/management/feeds/${data.feed_id}/consult/`)
            }, 3000);
        } catch (error) {
            toast("Une erreur s'est produite lors de la modification du flux rss", { type: "error", position: "top-center", })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Modifier les information du flux rss
                    </Typography>
                    {
                        canDisplay && (
                            <FeedForm mode={FormModes.EDIT} initialValues={feed} onSubmit={handleSubmit} />
                        )
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default FeedEdit;

