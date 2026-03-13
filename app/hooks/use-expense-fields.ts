import {useCategoryApi} from "@/app/categories/hooks/use-category-api";
import {CategoryItemProps} from "@/app/categories/types";

export const useExpenseFields = () => {
    const { data } = useCategoryApi();

    const categoryOptions = data && data.categories.map((cat: CategoryItemProps) => ({
        label: cat.name,
        value: String(cat.id)
    }));
    const expenseFormFields = [
        {
            name: "amount",
            type: "number" as const,
            required: true,
            placeholder: "Сумма"
        },
        {
            name: "description",
            type: "text" as const,
            required: false,
            placeholder: "Описание"
        },
        {
            name: "categoryId",
            type: "select" as const,
            required: true,
            placeholder: "Категория",
            options: categoryOptions,
        },
    ];

    return {
        expenseFormFields,
    }
}