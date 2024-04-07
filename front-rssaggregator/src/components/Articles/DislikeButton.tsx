import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ThumbDown, ThumbDownOffAlt } from '@mui/icons-material';
import { IInteraction } from '../../types/entities';
import { useOpinionArticleMutation } from '../../features/interactionsApi';
import { toast } from 'react-toastify';
interface IDislikeButtonProps {
    article_id: string,
    interactions: IInteraction[]
}

const findDislike = (interactions: IInteraction[]) => {
    return Boolean(interactions.find((interaction) => interaction.interaction_type === "opinion" && interaction.opinion === "DISLIKE"))
}
const DislikeButton: React.FC<IDislikeButtonProps> = ({ article_id, interactions }) => {
    const disliked = findDislike(interactions);
    const [giveOpinion] = useOpinionArticleMutation();


    const handleDislike = async () => {
        try {
            await giveOpinion({ articleId: article_id, opinion: "DISLIKE" }).unwrap();
            toast(`Thank you for your review`, { type: "success", position: "top-center", autoClose: 2000 })
        } catch (error) {
            toast(`Something went wrong`, { type: "error", position: "top-center", autoClose: 2000 })
        }
    };

    return (
        <IconButton size='small' onClick={handleDislike}>
            {disliked ? <ThumbDown /> : <ThumbDownOffAlt />}
        </IconButton>
    );
};

export default DislikeButton;