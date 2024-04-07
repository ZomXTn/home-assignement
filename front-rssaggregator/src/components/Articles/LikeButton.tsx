import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import { IInteraction } from '../../types/entities';
import { useOpinionArticleMutation } from '../../features/interactionsApi';
import { toast } from 'react-toastify';
interface ILikeButtonProps {
    article_id: string,
    interactions: IInteraction[]
}

const findLike = (interactions: IInteraction[]) => {
    return Boolean(interactions.find((interaction) => interaction.interaction_type === "opinion" && interaction.opinion === "LIKE"))
}
const LikeButton: React.FC<ILikeButtonProps> = ({ article_id, interactions }) => {
    const liked = findLike(interactions);
    const [giveOpinion] = useOpinionArticleMutation();
    const handleLike = async () => {
        try {
            await giveOpinion({ articleId: article_id, opinion: "LIKE" }).unwrap();
            toast(`Thank you for your review`, { type: "success", position: "top-center", autoClose: 2000 })
        } catch (error) {
            toast(`Something went wrong`, { type: "error", position: "top-center", autoClose: 2000 })
        }
    };

    return (
        <IconButton size='small' onClick={handleLike}>
            {liked ? <ThumbUp /> : <ThumbUpOffAlt />}
        </IconButton>
    );
};

export default LikeButton;