import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchParamsToObject } from '../utils';

interface PaginationOptions {
    totalItems: number;
}

interface PaginationState {
    page: number;
    totalPages: number;
    goToPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
}


const usePagination = ({ totalItems }: PaginationOptions): PaginationState => {
    const [params, setParams] = useSearchParams();
    const page: number = parseInt(params.get('page') || '1');
    const totalPages = Math.ceil(totalItems / 16);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setParams({ ...searchParamsToObject(params), page: page.toString() })
        }
    };

    const nextPage = () => {
        if (page < totalPages) {
            setParams({ ...searchParamsToObject(params), page: page.toString() })
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setParams({ ...searchParamsToObject(params), page: page.toString() });
        }
    };

    return {
        page,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
    };
};

export default usePagination;