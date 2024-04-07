

import { Box, Chip, Container, Divider, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { IInteraction, IUser } from '../types/entities';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import { useGetHistoryQuery } from '../features/interactionsApi';
import { StarHalf, ThumbDown, ThumbUp, Share, Visibility, Star } from '@mui/icons-material';
import usePagination from '../hooks/usePagination';
import { Link, useSearchParams } from 'react-router-dom';

const HistoryChip: React.FC<{ interaction: IInteraction }> = ({ interaction }) => {
    const { interaction_type, opinion } = interaction

    const getChipColor = () => {
        switch (interaction_type) {
            case 'rating':
                return 'primary';
            case 'opinion':
                return opinion === 'LIKE' ? 'success' : 'error';
            case 'share':
                return 'info';
            case 'read':
                return 'secondary';
            case 'favorite':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getChipLabel = () => {
        switch (interaction_type) {
            case 'rating':
                return `Avis: ${interaction.rating}`;
            case 'share':
                return `Plateform: ${interaction.share}`;
            case 'read':
                return 'Consulté';
            case 'favorite':
                return 'Favoris';
            case 'opinion':
                return opinion === 'LIKE' ? "J'aime" : "Je n'aime pas";
            default:
                return '';
        }
    };

    const getChipIcon = () => {
        switch (interaction_type) {
            case 'rating':
                return <StarHalf />;
            case 'opinion':
                return opinion === 'LIKE' ? <ThumbUp /> : <ThumbDown />;
            case 'share':
                return <Share />;
            case 'read':
                return <Visibility />;
            case 'favorite':
                return <Star />;
        }
    };

    return (
        <React.Fragment>
            <Chip color={getChipColor()} label={getChipLabel()} icon={getChipIcon()} />
        </React.Fragment>
    )
}

const HistoryPage: React.FC = () => {
    const user = useSelector(selectUser)
    const [params, setParams] = useSearchParams({ page: '1' });
    const { data, isLoading, isFetching, isSuccess } = useGetHistoryQuery(params.toString(), { refetchOnMountOrArgChange: true })
    const { page, totalPages, goToPage } = usePagination({ totalItems: data?.count || 0 })

    const canDisplay = data && !isLoading && !isFetching && isSuccess

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" component="h1" padding={2}>
                History of {user?.user_name}
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Article</TableCell>
                            <TableCell align="center">Type d'Interaction</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {canDisplay && data.results.map((interaction) => (
                            <TableRow key={interaction.id}>
                                <TableCell align="center">{new Date(interaction.timestamp).toLocaleString()}</TableCell>
                                <TableCell align="center"><Link to={`/articles/${interaction.article.article_id}/read`}>{interaction.article.title}</Link></TableCell>
                                <TableCell align="center"><HistoryChip interaction={interaction} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Divider />
                <Box display="flex" justifyContent="center" padding={2}>
                    <Pagination color="primary" page={page} count={totalPages} onChange={(_, page) => goToPage(page)} />
                </Box>
            </Paper>
        </Container>

    );
};

export default HistoryPage;
