import { Box, Button, Container, Divider, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useDeleteArticleMutation, useGetArticlesQuery } from "../../features/articlesApi";
import { EditSharp as EditIcon, Visibility } from "@mui/icons-material";
import { DeleteSharp as DeleteIcon } from "@mui/icons-material";
import React, { useState } from "react";
import usePagination from '../../hooks/usePagination';
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useOrderingParams from "../../hooks/useOrderBy";

const articleGridDef = [
    { key: 'title', name: "Titre", },
    { key: 'author', name: "Auteur" },
    { key: 'publication_date', name: "Date de publication" },
    { key: 'feed__name', name: "Flux rss" },
    { key: 'actions', name: "Action" },
]

const ArticlesManagement: React.FC = () => {
    const [queries] = useSearchParams({ page: "1" })
    const { column, setOrderBy, type } = useOrderingParams()
    const { data: articles, isLoading, isFetching, isSuccess } = useGetArticlesQuery(queries.toString(), { refetchOnMountOrArgChange: true })
    const { page, totalPages, goToPage } = usePagination({ totalItems: articles?.count || 0 })
    const canDisplay = isSuccess && !isLoading && articles
    const [sortColumn, setSortColumn] = useState<string>(column);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(type);
    const navigate = useNavigate();
    const [deleteArticle] = useDeleteArticleMutation()

    const handleSort = (column: string) => {
        if (sortColumn == column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            setOrderBy(column, sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column);
            setSortDirection("asc");
            setOrderBy(column, "asc")
        }
    };
    const handleDelete = async (id: string) => {
        try {
            const data = await deleteArticle(id).unwrap()
            toast("L'article was deleted successfully", { type: "success", position: "top-center", autoClose: 2000 })
        } catch (error) {
            toast("Something went wrong when deleting de l'article", { type: "error", position: "top-center" })
        }
    }


    return (
        <Container maxWidth="xl">
            <Paper sx={{marginBottom : 2}}>
                <Box padding={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="span">Management articles</Typography>
                </Box>
            </Paper>
            <Paper>
                <Box width="100%" padding={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {articleGridDef.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        onClick={() => { if (column.key != "actions") handleSort(column.key) }}
                                        sx={{ cursor: "pointer" }}
                                        align="center"
                                    >
                                        {column.name}
                                        {sortColumn === column.key && column.key !== "actions" && (
                                            <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {canDisplay &&
                                articles.results.map((article) => (
                                    <TableRow key={article.article_id}>
                                        <TableCell align="center">{article.title}</TableCell>
                                        <TableCell align="center">{article.author}</TableCell>
                                        <TableCell align="center">
                                            {new Date(article.publication_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">{article.feed?.name}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => navigate(`/management/articles/${article.article_id}/consult`)}>
                                                <Visibility />
                                            </IconButton>
                                            <IconButton onClick={() => navigate(`/management/articles/${article.article_id}/edit`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(article.article_id || "")}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <Divider />
                    <Box display="flex" justifyContent="center" padding={2}>
                        <Pagination color="primary" page={page} count={totalPages} onChange={(_, page) => goToPage(page)} />
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default ArticlesManagement;