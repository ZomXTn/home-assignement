import * as React from 'react';
import { Container, Box, Typography, Paper, Button, Grid, Divider, Stack, Rating, Chip } from '@mui/material';
import { useGetArticleQuery } from '../../../features/articlesApi';
import { Navigate, useParams } from 'react-router-dom';
import ShareButton from '../../../components/Articles/ShareButton';
import RatingBox from '../../../components/Articles/RatingBox';
import FavoriteButton from '../../../components/Articles/FavoriteButton';
import LikeButton from '../../../components/Articles/LikeButton';
import DislikeButton from '../../../components/Articles/DislikeButton';
import { useReadArticleMutation } from '../../../features/interactionsApi';

const NewsArticle = () => {
    const [startTime, setStartTime] = React.useState(new Date());
    const { id } = useParams()
    const { data: article, isError, isSuccess, isLoading } = useGetArticleQuery(id || "")
    const [readArticle] = useReadArticleMutation()

    React.useEffect(() => {
        const handleBeforeUnload = () => {
            const endTime = new Date();
            const duration = endTime.getTime() - startTime.getTime();
            readArticle({ id: id || "", duration })
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <Paper>
                {
                    isSuccess && Boolean(article) && (
                        <Box sx={{ my: 4, p: 2 }}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {article.title}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "flex-end" }}>
                                <Box maxWidth="60%">
                                    <Typography variant='body1' color='text.secondary' gutterBottom>
                                        Published by {article.feed.name}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Written by {article.author}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {new Date(article.publication_date).toLocaleString()}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        Categories: {article.categories.map((category) => (
                                            <Chip key={category.id} label={category.name} />
                                        ))}
                                    </Typography>
                                </Box>
                                <Stack direction="row" columnGap={2} alignItems="center">
                                    <ShareButton articleId={article.article_id || ""} />
                                    <RatingBox articleId={article.article_id || ""} interactions={article.article_interactions || []} />
                                    <FavoriteButton articleId={article.article_id || ""} interactions={article.article_interactions || []} />
                                    <DislikeButton article_id={article.article_id || ""} interactions={article.article_interactions || []} />
                                    <LikeButton article_id={article.article_id || ""} interactions={article.article_interactions || []} />
                                </Stack>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box width="100%" height="auto">

                                <Box
                                    component="img"
                                    sx={{
                                        maxWidth: "30%",
                                        float: "right",
                                        margin: "0 0 1 1",
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        border: 10,
                                        borderColor: "#F5F5F5",
                                    }}
                                    alt="Complexité du vote"
                                    src={article.image_url} // You should place your image in the public folder or import it.
                                />
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                                {article.content}
                            </Typography>


                        </Box>
                    )
                }
                {isError && (
                    <Navigate to="/404" replace />
                )
                }

            </Paper>
        </Container>
    );
}

export default NewsArticle;
