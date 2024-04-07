import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../../../components/Articles/ArticlesForm";
import { IArticle } from "../../../types/entities";
import { FormModes } from "../../../types/types";
import { useGetArticleQuery } from "../../../features/articlesApi";


const ConsultArticle: React.FC = () => {
    const { id } = useParams();
    const { data, isFetching, isLoading, isSuccess, isError } = useGetArticleQuery(id || "", { skip: !id });
    const canDisplay = isSuccess && !isLoading;
    const navigate = useNavigate();
    const handleSubmit = async (values: IArticle) => {
        try {
            navigate(`/management/articles/${data?.article_id}/edit/`)
        } catch (error) {
            toast("Une erreur est survenue lors de la consultation de l'article", { type: "error", position: "top-center" })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Consulter un article
                    </Typography>
                    {
                        canDisplay && <ArticleForm mode={FormModes.CONSULT} initialValues={data} onSubmit={handleSubmit} />
                    }
                    {
                        isError && (<Navigate to="404" />)
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default ConsultArticle;