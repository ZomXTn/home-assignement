import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../../../components/Articles/ArticlesForm";
import { IArticle, IFeed } from "../../../types/entities";
import { FormModes } from "../../../types/types";
import { useGetArticleQuery, useUpdateArticleMutation } from "../../../features/articlesApi";
4
const EditArticle: React.FC = () => {
    const [updateArticle] = useUpdateArticleMutation();
    const { id } = useParams();
    const { data, isFetching, isLoading, isSuccess, isError } = useGetArticleQuery(id || "", { skip: !id });
    const canDisplay = isSuccess && !isFetching && !isLoading;
    const navigate = useNavigate();
    const handleSubmit = async (values: IArticle) => {
        try {
            const { feed_id } = values.feed
            const categories_ids = values.categories.map((cat) => cat.id);
            const data = await updateArticle({ ...values, feed_id: feed_id || "", categories_ids }).unwrap();
            toast(`L'article a été modifié successfully`, { type: "success", position: "top-center", autoClose: 3000 })
            setTimeout(() => {
                navigate(`/management/articles/${data.article_id}/consult/`)
            }, 3000);
        } catch (error) {
            toast("Une erreur est survenu lors de la modification de l'article", { type: "error", position: "top-center" })
        }
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ width: "50%", marginX: "auto", padding: 2 }}>
                <Stack spacing={2} direction="column">
                    <Typography component="h1" variant="h5" textAlign="center">
                        Modifier les informations de l'article
                    </Typography>
                    {
                        canDisplay && <ArticleForm initialValues={data} mode={FormModes.EDIT} onSubmit={handleSubmit} />
                    }
                    {
                        isError && (<Navigate to="404" />)
                    }
                </Stack>
            </Paper>
        </Container>
    );
};

export default EditArticle;