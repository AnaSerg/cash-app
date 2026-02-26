import {useCategoriesStore} from "@/store/category";
import {useCategoryApi} from "@/app/categories/hooks/use-category-api";

export const useExpenseFields = () => {
    const { categories } = useCategoryApi();

    const categoryOptions = categories && categories.map(cat => ({
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