import { useDrawerForm } from "@/app/hooks/use-drawer-form";
import { useSubCategoryApi } from "./api/use-subcategory-api";
import { Subcategory } from "@/app/categories/types";

const validate = (fields: { name: string }) => {
    if (!fields.name.trim()) {
        return "Введите название подкатегории";
    }
    return null;
};

export const useEditSubCategory = (subcategory: Subcategory, onSuccess?: () => void) => {
    const { editSubCategory } = useSubCategoryApi();
    const { fields, update, updateField, resetFields, validationMessage, withSave } = useDrawerForm(
        () => ({ name: subcategory.name }),
    );

    const handleSave = () => withSave(
        () => validate(fields),
        async () => {
            await editSubCategory({
                id: subcategory.id,
                name: fields.name.trim(),
            });
        },
        onSuccess,
    );

    return { fields, update, updateField, resetFields, validationMessage, handleSave };
};
