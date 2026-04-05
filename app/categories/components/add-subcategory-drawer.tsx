import {DrawerCalculator} from "@/app/ui/components/drawer-calculator";
import {useMemo} from "react";
import {CategoryItemProps} from "../types";
import {useAddSubCategory} from "../hooks/use-add-subcategory";

export const AddSubcategoryDrawer = ({ category, isOpen, drawerKey, onOpenChange }: { category: CategoryItemProps, isOpen: boolean, drawerKey: number, onOpenChange: (value: boolean) => void }) => {
    const { fields, update, updateField, resetFields, validationMessage, handleSave } = useAddSubCategory(
        category,
        () => onOpenChange(false)
    );

    const calculatorFields = useMemo(() => [
        {
            key: "name",
            type: "letter" as const,
            value: fields.name,
            placeholder: "Название подкатегории",
            onChange: updateField("name"),
        },
    ], [fields.name, updateField]);

    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
        if (!open) resetFields();
    };

    return (
        <DrawerCalculator
            isOpen={isOpen}
            onOpenChange={handleOpenChange}
            onSave={handleSave}
            trigger={null}
            buttonText="Добавить"
            calculatorKey={drawerKey}
            calculatorProps={{
                validationMessage,
                fields: calculatorFields,
            }}
        />
    );
};
