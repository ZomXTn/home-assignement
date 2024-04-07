import { useGetArticlesQuery } from "../../features/articlesApi"
import usePagination from '../../hooks/usePagination';
import React from "react";
import { useSearchParams } from "react-router-dom";
import ArticleList from "../../components/Articles/ArticleList";


const Index: React.FC<{ favorite?: boolean }> = ({ favorite }) => {
    const [params, setParams] = useSearchParams({ page: '1', favorite_only: favorite ? 'true' : 'false' });
    const { data: articles, isLoading, isFetching, isSuccess } = useGetArticlesQuery(params.toString(), { refetchOnMountOrArgChange: true });
    const { page, totalPages, goToPage } = usePagination({ totalItems: articles?.count || 0 });
    return (
        <ArticleList articles={articles?.results} page={page} totalPages={totalPages} goToPage={goToPage} />
    );
}

export default Index