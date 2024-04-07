import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import FeedForm from "../../../components/Feeds/FeedForm";
import { IFeed } from "../../../types/entities";
import { useGetFeedQuery } from "../../../features/feedsApi";
import { FormModes } from "../../../types/types";

const FeedConsult: React.FC = () => {
    const { id } = useParams();
    const news_id = id || "";
    const { data: feed, isLoading, isFetching, isSuccess, isError } = useGetFeedQuery(news_id)
    const canDisplay = isSuccess && !isLoading && Boolean(feed);
    const navigate = useNavigate();

    const handleSubmit = async (values: IFeed) => {
        navigate(`/management/feeds/${id}/edit/`);
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Consulter les informations du flux rss
                    </Typography>
                    {
                        canDisplay && (
                            <FeedForm mode={FormModes.CONSULT} initialValues={feed} onSubmit={handleSubmit} />
                        )
                    }
                    {
                        isError && (<Navigate to="404" />)
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default FeedConsult;

