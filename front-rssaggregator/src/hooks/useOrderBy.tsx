import { useSearchParams } from 'react-router-dom';
import { searchParamsToObject } from '../utils';

const useOrderingParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const ordering = searchParams.get('ordering') || '';

    let column = ordering;
    let type: 'asc' | 'desc' = 'asc';

    if (ordering.startsWith('-')) {
        column = ordering.slice(1);
        type = 'desc';
    }

    const setOrderBy = (column: string, type: string) => {
        setSearchParams({ ...searchParamsToObject(searchParams), ordering: `${type === 'asc' ? '' : '-'}${column}` });
    }

    return { column, type, setOrderBy };
};

export default useOrderingParams;