import { Card, CardHeader, Avatar, Divider, CardMedia, CardContent, Typography, CardActions, Button, Box, Chip, Stack } from "@mui/material"
import { grey, orange } from "@mui/material/colors"
import FavoriteButton from "./FavoriteButton"
import ShareButton from "./ShareButton"
import RatingBox from "./RatingBox"
import { IArticle } from "../../types/entities"
import React from "react"
import { useNavigate } from "react-router-dom"

interface IArticleCardProps {
    article: IArticle
}
const ArticleCard: React.FC<IArticleCardProps> = ({ article }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{
            border: 1,
            borderColor: grey[300],
        }}
        >
            <CardHeader avatar={<Avatar sx={{ bgcolor: orange[400] }} src={article?.feed?.image_url} />} title={article?.title} subheader={new Date(article?.publication_date).toLocaleDateString()} />
            <Divider />
            <CardMedia component="img" image={article?.image_url} sx={{ height : "150px" }} />
            <Divider />
            <CardContent>
                <Box width="100%">
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                        <Typography noWrap textOverflow={"ellipsis"} overflow="hidden" component="p">
                            {article?.content}
                        </Typography>
                    </Box>
                    {article.categories.length > 0 && (
                        <Stack justifyContent="center" alignItems="center" direction="row" gap={1} sx={{ width: "100%" }} paddingTop={1}>
                            {article.categories.slice(0, 3).map((category, index) => (
                                <Chip key={category.id} label={category.name} />
                            ))}
                            {article.categories.length > 3 && (
                                <Chip label={`+${article.categories.length - 3}`} />
                            )}
                        </Stack>
                    )}
                </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <FavoriteButton articleId={article?.article_id || ""} interactions={article?.article_interactions || []} />
                <ShareButton articleId={article?.article_id || ""} />
                <RatingBox articleId={article?.article_id || ""} interactions={article?.article_interactions || []} />
                <Button variant="contained" size="small" onClick={() => navigate(`/articles/${article?.article_id}/read`)}><Typography variant="caption">Read More</Typography></Button>
            </CardActions>
        </Card>
    )
}

export default ArticleCard;