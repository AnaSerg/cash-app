import { useDrawerForm } from "@/app/hooks/use-drawer-form";
import { parseAmountInput } from "@/app/lib/format-number-with-space";
import { useCategoryApi } from "./api/use-category-api";
import { CategoryItemProps } from "@/app/categories/types";

const validateCategoryFields = (fields: { name: string; limit: string }) => {
    if (!fields.name.trim()) return "Введите название категории";
    const parsedLimit = parseAmountInput(fields.limit);
    if (!fields.limit.trim() || !Number.isFinite(parsedLimit) || parsedLimit <= 0) return "Введите лимит на категорию";
    return null;
};

export const useEditCategory = (category: CategoryItemProps, onSuccess?: () => void) => {
    const { editCategory } = useCategoryApi();
    const { fields, update, updateField, resetFields, validationMessage, withSave } = useDrawerForm(
        () => ({ name: category.name, limit: String(category.limit) }),
    );

    const handleSave = () => withSave(
        () => validateCategoryFields(fields),
        async () => {
            await editCategory({
                id: category.id,
                name: fields.name.trim(),
                limit: parseAmountInput(fields.limit),
                archived: category.archived,
            });
        },
        onSuccess,
    );

    return { fields, update, updateField, resetFields, validationMessage, handleSave };
};
