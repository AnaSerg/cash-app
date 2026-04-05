import { useDrawerForm } from "@/app/hooks/use-drawer-form";
import {useSubCategoryApi} from "@/app/categories/hooks/api/use-subcategory-api";
import {CategoryItemProps} from "@/app/categories/types";

const validateCategoryFields = (fields: { name: string }) => {
    if (!fields.name.trim()) {
        return "Введите название подкатегории";
    }
    return null;
};

export const useAddSubCategory = (category: CategoryItemProps, onSuccess?: () => void) => {
    const { addSubCategory } = useSubCategoryApi();
    const { fields, update, updateField, resetFields, validationMessage, withSave } = useDrawerForm(
        () => ({ name: "", categoryId: "" }),
    );

    console.log(fields, category);

    const handleSave = () => withSave(
        () => validateCategoryFields(fields),
        async () => {
            await addSubCategory({ name: fields.name.trim(), categoryId: Number(category.id), });
        },
        onSuccess,
    );

    return { fields, update, updateField, resetFields, validationMessage, handleSave };
};
