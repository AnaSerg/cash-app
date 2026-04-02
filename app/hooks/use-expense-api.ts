import useSWRMutation from "swr/mutation";
import {mutate} from "swr";

export type CreateExpensePayload = {
    description?: string;
    amount: number;
    categoryId: number;
};

export const useExpenseApi = () => {
    const { trigger: addExpense } = useSWRMutation<
        void,
        Error,
        "add-expense",
        CreateExpensePayload
    >("add-expense", postExpense, {
        onSuccess: () => {
            mutate("/api/category");
        },
    });

    return { addExpense };
};

async function postExpense(_key: string, { arg }: { arg: CreateExpensePayload }): Promise<void> {
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

    await res.json();
}
