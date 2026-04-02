export type CategoryItemProps = {
    id: number;
    name: string;
    limit: number;
    remaining?: number;
    totalSpent?: number;
    archived: boolean;
}

export type Subcategory = {
    id: number;
    name: string;
}