import useSWRMutation from "swr/mutation";
import useSWR, {mutate} from "swr";
import {CategoryItemProps} from "@/app/categories/types";

export const useExpenseApi = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    /*
    const { data: expenses, error, isLoading } = useSWR(
        '/api/category',
        fetcher
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
     */

    const { trigger: addExpense } = useSWRMutation(
        'add-expense',
        postExpense,
        {
            onSuccess: () => {
                mutate('/api/category');
            },
        }
    );

    return { addExpense };
}

async function postExpense(_key: string, { arg }: { arg: CategoryItemProps }): Promise<void> {
    const res = await fetch('/api/expense/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        throw new Error('Failed to add expense');
    }

    return res.json();
}