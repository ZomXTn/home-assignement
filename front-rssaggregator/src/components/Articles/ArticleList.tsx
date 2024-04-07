import React from 'react';
import { Box, CircularProgress, Container, Divider, Grid, MenuItem, Pagination, Paper, TextField } from '@mui/material';
import { searchParamsToObject } from '../../utils';
import ArticleCard from './ArticleCard';
import { IArticle } from '../../types/entities';
import { useSearchParams } from 'react-router-dom';
import useOrderingParams from '../../hooks/useOrderBy';

interface ArticleListProps {
    articles: IArticle[] | undefined;
    page: number;
    totalPages: number;
    goToPage: (page: number) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, page, totalPages, goToPage }) => {
    const [params, setParams] = useSearchParams({ page: '1' });
    const { column, type, setOrderBy } = useOrderingParams()
    const title = params.get("title") || "";
    const publication_date = (params.get("publication_date") || new Date().toISOString()).split('T')[0];
    const author = params.get("author") || "";

    return (
        <Container maxWidth="xl">
            <Paper>
                <Grid container justifyContent="space-around" padding={2}>
                    <Grid item xs={2}>
                        <TextField label="Recherche par Titre" fullWidth value={title} onChange={(e) => setParams({ ...searchParamsToObject(params), title: e.target.value })} placeholder="Titre..." />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={2}>
                        <TextField label="Date de publication" fullWidth value={publication_date} onChange={(e) => setParams({ ...searchParamsToObject(params), publication_date: e.target.value })} type="date" />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={2}>
                        <TextField label="Recherche par Auteur" fullWidth value={author} onChange={(e) => setParams({ ...searchParamsToObject(params), author: e.target.value })} placeholder="Titre..." />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={2}>
                        <TextField onChange={(e) => { setOrderBy(e.target.value, "asc") }} label="Trier par" select fullWidth>
                            <MenuItem value="title">Titre</MenuItem>
                            <MenuItem value="publication_date">Date de publication</MenuItem>
                            <MenuItem value="author">Auteur</MenuItem>
                            <MenuItem value="feed__name">Flux rss</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
            </Paper>
            <Paper>
                {articles ? (
                    <Grid container marginTop={3} alignItems="center" justifyContent="flex-start" minHeight="50vh">
                        {articles.length > 0 ? (
                            articles.map((article, index) => (
                                <Grid item lg={3} key={index} padding={1}>
                                    <ArticleCard article={article} />
                                </Grid>
                            ))
                        ) : (
                            // no articles found
                            <Grid item xs={12} textAlign="center">
                                <h3>No Articles</h3>
                            </Grid>
                        )}
                    </Grid>
                ) : (
                    // center the loading spinner mui
                    <Grid container marginTop={3} justifyContent="center" alignItems="center" height="50vh">
                        <Grid item>
                            <CircularProgress color="primary" />
                        </Grid>
                    </Grid>
                )}
                <Box display="flex" justifyContent="center" padding={2}>
                    <Pagination color="primary" page={page} count={totalPages} onChange={(_, page) => goToPage(page)} />
                </Box>
            </Paper>
        </Container>
    );
};

export default ArticleList;