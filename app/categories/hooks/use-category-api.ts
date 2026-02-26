import useSWRMutation from "swr/mutation";
import useSWR, {mutate} from "swr";
import {CategoryItemProps} from "@/app/categories/types";

export const useCategoryApi = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data: categories, error, isLoading } = useSWR(
        '/api/category',
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    );

    const { trigger: editCategory } = useSWRMutation(
        'edit-category',
        patchCategory,
        {
            onSuccess: () => {
                mutate('/api/category');
            },
        }
    );

    const { trigger: deleteCategory } = useSWRMutation(
        'delete-category',
        removeCategory,
        {
            onSuccess: () => {
                mutate('/api/category');
            },
        }
    );

    const { trigger: addCategory } = useSWRMutation(
        'add-category',
        postCategory,
        {
            onSuccess: () => {
                mutate('/api/category');
            },
        }
    );

    return { addCategory, editCategory, deleteCategory, categories, error, isLoading };
}

async function postCategory(_key: string, { arg }: { arg: CategoryItemProps }): Promise<void> {
    const res = await fetch('/api/category/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        throw new Error('Failed to add category');
    }

    return res.json();
}

async function patchCategory(_key: string, { arg }: { arg: CategoryItemProps }): Promise<void> {
    const res = await fetch(`/api/category/${arg.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: arg.name,
            limit: Number(arg.limit)
        }),
    });

    if (!res.ok) throw new Error('Failed to edit category');
    return res.json();
}

async function removeCategory(_key: string, { arg }: { arg: number }): Promise<void> {
    const res = await fetch(`/api/category/${arg}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) throw new Error('Failed to delete category');
    return res.json();
}