import useSWRMutation from "swr/mutation";
import useSWR, {mutate} from "swr";

export const useSubCategoryApi = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data, error, isLoading } = useSWR(
        '/api/category',
        fetcher,
    );

    const { trigger: editSubCategory } = useSWRMutation(
        'edit-subcategory',
        patchSubCategory,
        {
            onSuccess: () => {
                mutate('/api/category');
            },
        }
    );

    const { trigger: addSubCategory } = useSWRMutation(
        'add-subcategory',
        postSubCategory,
        {
            onSuccess: () => {
                mutate('/api/category');
            },
        }
    );

    const { trigger: deleteSubCategory } = useSWRMutation(
        'delete-subcategory',
        removeSubCategory,
        {
            onSuccess: () => {
                mutate('/api/category');
            },
        }
    );

    return { addSubCategory, editSubCategory, deleteSubCategory, data, error, isLoading };
}

async function postSubCategory(_key: string, { arg }: { arg: { name: string; categoryId: number | string } }): Promise<void> {
    const res = await fetch('/api/subcategory/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: arg.name, categoryId: arg.categoryId }),
    });

    if (!res.ok) {
        throw new Error('Failed to add subcategory');
    }

    return res.json();
}

async function patchSubCategory(_key: string, { arg }: { arg: { id: number; name: string } }): Promise<void> {
    const res = await fetch(`/api/subcategory/${arg.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: arg.name }),
    });

    if (!res.ok) throw new Error('Failed to edit subcategory');
    return res.json();
}

async function removeSubCategory(_key: string, { arg }: { arg: number }): Promise<void> {
    const res = await fetch(`/api/subcategory/${arg}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to delete subcategory');
    return res.json();
}