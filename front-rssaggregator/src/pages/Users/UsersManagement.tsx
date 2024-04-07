import { Box, Button, Chip, Container, Divider, IconButton, Pagination, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { EditSharp as EditIcon, Visibility } from "@mui/icons-material";
import { DeleteSharp as DeleteIcon } from "@mui/icons-material";
import React, { useState } from "react";
import usePagination from '../../hooks/usePagination';
import { useGetUsersQuery } from "../../features/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { key } from "localforage";
import useOrderingParams from "../../hooks/useOrderBy";
import { algorithmsMap } from "../../constants";

const userGridDef = [
    { key: 'user_name', name: "Username", },
    { key: 'first_name', name: "First name" },
    { key: 'last_name', name: "Last name" },
    { key: 'email', name: "Adresse mail" },
    { key: 'phone_number', name: "Num Tél" },
    { key: 'adress', name: "Adresse" },
    { key: 'is_active', name: "Compte actif" },
    { key: 'is_staff', name: "Administration" },
    { key: 'algorithm', name: "Affectation de l'algorithme" },
    { key: 'actions', name: "Action" },

]

const UsersManagement: React.FC = () => {
    const [params] = useSearchParams({ page: '1' })
    const { column, type, setOrderBy } = useOrderingParams()
    const { data: users, isLoading, isFetching, isSuccess } = useGetUsersQuery(params.toString(), { refetchOnMountOrArgChange: true })
    const { page, totalPages, goToPage } = usePagination({ totalItems: users?.count || 0 })
    const canDisplay = isSuccess && !isLoading && users
    const [sortColumn, setSortColumn] = useState<string>(column);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(type);
    const navigate = useNavigate();

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
                    <Typography variant="h4" component="span">Management utilisateurs</Typography>
                    <Button variant="contained" color="primary" onClick={() => navigate(`/management/users/create`)}>Inviter un utilisateur</Button>
                </Box>
            </Paper>
            <Paper>
                <Box width="100%" padding={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {userGridDef.map((column) => (
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
                                users.results.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align="center" >{user.user_name}</TableCell>
                                        <TableCell align="center">{user.first_name}</TableCell>
                                        <TableCell align="center">{user.last_name}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{user.phone_number}</TableCell>
                                        <TableCell align="center">{user.adress}</TableCell>
                                        <TableCell align="center">{user.is_active ? <Chip color="success" label="Activé" /> : <Chip color="primary" label="En attente d'activation" />}</TableCell>
                                        <TableCell align="center">{user.is_staff ? <Chip color="info" label="Administrateur" /> : <Chip color="error" label="Utilisateur" />}</TableCell>
                                        <TableCell align="center">{algorithmsMap.get(user.algorithm)}</TableCell>
                                        <TableCell align="center">
                                            {/* Actions */}
                                            <IconButton onClick={() => navigate(`/management/users/${user.id}/edit`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => navigate(`/management/users/${user.id}/consult`)}>
                                                <Visibility />
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

export default UsersManagement;