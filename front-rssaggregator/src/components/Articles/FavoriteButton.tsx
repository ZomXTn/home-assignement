import { IconButton } from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import React from "react";
import { useFavoriteArticleMutation } from "../../features/interactionsApi";
import { toast } from "react-toastify";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IInteraction } from "../../types/entities";

interface IFavoriteButton {
    articleId: string,
    interactions: IInteraction[]
}
const findFavorite = (interactions: any[]) => {
    return Boolean(interactions.find((interaction) => interaction.interaction_type === "favorite"))
}
const FavoriteButton: React.FC<IFavoriteButton> = ({ articleId, interactions }) => {
    const favorite = findFavorite(interactions);
    const [markAsFavorite] = useFavoriteArticleMutation()
    const handleFavorite = async () => {
        try {
            const data = await markAsFavorite({ articleId }).unwrap()
            toast(`Article was ${!favorite ? "added to favorites" : "removed from favorites"}`, { type: "success", position: "top-center", autoClose: 2000 })
        } catch (error) {
            toast(`Something went wrong`, { type: "error", position: "top-center", autoClose: 2000 })
        }
    }
    return (
        <IconButton size="small" onClick={handleFavorite}>
            {favorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
    );
}

export default FavoriteButton