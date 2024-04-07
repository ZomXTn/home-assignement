import { Box, Button, Container, Divider, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { EditSharp as EditIcon, Visibility } from "@mui/icons-material";
import { DeleteSharp as DeleteIcon } from "@mui/icons-material";
import { Feed as FeedIcon } from "@mui/icons-material";
import React, { useState } from "react";
import usePagination from '../../hooks/usePagination';
import { useGetFeedsQuery, useDeleteFeedMutation, useUnsubscribeFromFeedMutation } from "../../features/feedsApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useOrderingParams from "../../hooks/useOrderBy";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/authSlice";

const feedGridDef = [
    { key: 'name', name: "Name" },
    { key: 'actions', name: "Action" },
]

const FeedManagement: React.FC<{ admin: boolean }> = ({ admin }) => {
    const user = useSelector(selectUser)
    const [params] = useSearchParams({ page: '1' })
    const { column, type, setOrderBy } = useOrderingParams()
    const { data: feeds, isLoading, isFetching, isSuccess } = useGetFeedsQuery(params.toString(), { refetchOnMountOrArgChange: true })
    const { page, totalPages, goToPage } = usePagination({ totalItems: feeds?.results.length || 0 })
    const canDisplay = isSuccess && !isLoading && feeds
    const [sortColumn, setSortColumn] = useState<string>(column);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(type);
    const navigate = useNavigate();
    const [deleteFeed] = useDeleteFeedMutation()
    const [unsubscribe] = useUnsubscribeFromFeedMutation()
    const handleDelete = async (id: string) => {
        try {
            const data = await deleteFeed(id).unwrap()
            toast("Rss Feed was deleted successfully", {
                type: "success", position: "top-center", autoClose: 2000, onClose: () => {
                    navigate("/feeds")
                }
            })
        } catch (error) {
            toast("Something went wrong when deleting du RSS Feed", { type: "error", position: "top-center" })
        }
    }
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

    return (
        <Container maxWidth="xl">
            <Paper sx={{ marginBottom: 1 }}>
                <Box padding={3} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="span">Management RSS Feeds</Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/management/feeds/create`)}>Créer un flux rss</Button>
                </Box>
            </Paper>
            <Paper>
                <Box width="100%" padding={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {feedGridDef.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        onClick={() => { if (column.key != "actions") handleSort(column.key) }}
                                        sx={{ cursor: "pointer", textAlign: "center" }}
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
                                feeds.results.map((feed) => (
                                    <TableRow key={feed.feed_id}>
                                        <TableCell align="center">{feed.name}</TableCell>
                                        <TableCell align="center">
                                            {/* Actions */}
                                            {
                                                admin && (
                                                    <React.Fragment>
                                                        <IconButton onClick={() => navigate(`/management/feeds/${feed.feed_id}/consult`)}>
                                                            <Visibility />
                                                        </IconButton>
                                                        <IconButton onClick={() => navigate(`/management/feeds/${feed.feed_id}/edit`)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => navigate(`/management/articles?feed=${feed.feed_id}`)}>
                                                            <FeedIcon />
                                                        </IconButton>
                                                    </React.Fragment>
                                                )
                                            }
                                            <IconButton onClick={() => admin ? handleDelete(feed.feed_id || "") : unsubscribe(feed.feed_id || "")}>
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

export default FeedManagement;