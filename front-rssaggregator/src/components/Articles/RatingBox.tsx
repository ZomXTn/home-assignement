import { Rating } from "@mui/material"
import React from "react";
import { useRateArticleMutation } from "../../features/interactionsApi";
import { IInteraction } from "../../types/entities";
import { toast } from "react-toastify";

interface RatingBoxProps {
    interactions: IInteraction[],
    articleId: string
}
const findRating = (interactions: IInteraction[]) => {
    const rating = interactions.find((interaction) => interaction.interaction_type === "rating")?.rating
    return rating ? rating : 0
}
const RatingBox: React.FC<RatingBoxProps> = ({ interactions, articleId }) => {
    const rating = findRating(interactions);
    const [rateArticle] = useRateArticleMutation()
    const handleRatingChange = async (newRating: number) => {
        try {
            const data = await rateArticle({ articleId, rating: newRating }).unwrap()
            toast(`Thank you for your review`, { type: "success", position: "top-center", autoClose: 2000 })
        } catch (error) {
            toast(`Something went wrong`, { type: "error", position: "top-center", autoClose: 2000 })
        }
    }
    return (
        <Rating size="small" value={rating} onChange={(_, value) => handleRatingChange(value ? value : 0)} />
    )
}

export default RatingBox