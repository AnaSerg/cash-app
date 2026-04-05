import { useExpenseApi } from "./api/use-expense-api";
import { parseAmountInput } from "../lib/format-number-with-space";
import { useDrawerForm } from "./use-drawer-form";

const initialExpenseFields = () => ({
    amount: "",
    comment: "",
    categoryId: "",
    subCategoryId: "",
});

export const useAddExpense = (onSuccess?: () => void) => {
    const { fields, update, updateField, resetFields, validationMessage, withSave } = useDrawerForm(initialExpenseFields);
    const { addExpense } = useExpenseApi();

    const handleSaveExpense = () => withSave(
        () => {
            const parsedAmount = parseAmountInput(fields.amount);
            const amountMissing = !fields.amount.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0;
            const categoryMissing = !fields.categoryId;

            if (amountMissing && categoryMissing) return "Введите сумму расхода и категорию";
            if (amountMissing) return "Введите сумму расхода";
            if (categoryMissing) return "Выбери категорию";
            return null;

        },
        async () => {
            await addExpense({
                description: fields.comment.trim() || undefined,
                amount: parseAmountInput(fields.amount),
                categoryId: Number(fields.categoryId),
                subCategoryId: Number(fields.subCategoryId),
            });
        },
        onSuccess,
    );

    return { fields, update, updateField, resetFields, validationMessage, handleSaveExpense };
};
