import { useDrawerForm } from "@/app/hooks/use-drawer-form";
import { parseAmountInput } from "@/app/lib/format-number-with-space";
import { useCategoryApi } from "./use-category-api";

const validateCategoryFields = (fields: { name: string; limit: string }) => {
    if (!fields.name.trim()) return "Введите название категории";
    const parsedLimit = parseAmountInput(fields.limit);
    if (!fields.limit.trim() || !Number.isFinite(parsedLimit) || parsedLimit <= 0) return "Введите лимит на категорию";
    return null;
};

export const useAddCategory = (onSuccess?: () => void) => {
    const { addCategory } = useCategoryApi();
    const { fields, update, updateField, resetFields, validationMessage, withSave } = useDrawerForm(
        () => ({ name: "", limit: "" }),
    );

    const handleSave = () => withSave(
        () => validateCategoryFields(fields),
        async () => {
            await addCategory({ name: fields.name.trim(), limit: parseAmountInput(fields.limit) });
        },
        onSuccess,
    );

    return { fields, update, updateField, resetFields, validationMessage, handleSave };
};
