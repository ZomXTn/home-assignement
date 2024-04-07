interface IPaginated<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

interface PaginationProps {
    page?: number;
}

export enum FormModes {
    CONSULT = "consult",
    EDIT = "edit",
    CREATE = "create"
}

interface IActivation {
    uid: string,
    token: string,
    old_password: string,
    new_password: string,
}



export type { IPaginated, PaginationProps , IActivation }