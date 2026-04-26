import useSWRMutation from "swr/mutation";
import useSWR, {mutate} from "swr";

export type CreateExpensePayload = {
    description?: string;
    amount: number;
    categoryId: number;
    subCategoryId?: number;
};

export const useExpenseApi = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const { data: calendarData, error, isLoading } = useSWR(
        '/api/expense/calendar',
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        }
    );

    const { trigger: addExpense } = useSWRMutation<
        void,
        Error,
        "add-expense",
        CreateExpensePayload
    >("add-expense", postExpense, {
        onSuccess: () => {
            mutate("/api/category");
            mutate("/api/expense/calendar");
        },
    });

    return { calendarData, error, isLoading, addExpense };
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
