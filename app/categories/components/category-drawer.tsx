import {DrawerCalculator} from "@/app/ui/components/drawer-calculator";
import {useMemo} from "react";
import {useAddCategory} from "@/app/categories/hooks/use-add-category";

export const CategoryDrawer = ({ isOpen, drawerKey, onOpenChange }: { isOpen: boolean, drawerKey: number, onOpenChange: (value: boolean) => void }) => {
    const { fields, updateField, resetFields, validationMessage, handleSave } = useAddCategory(() => onOpenChange(false));

    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
        if (!open) resetFields();
    };

    const calculatorFields = useMemo(() => [
        {
            key: "name",
            type: "letter" as const,
            value: fields.name,
            placeholder: "Название категории",
            onChange: updateField("name"),
        },
        {
            key: "limit",
            type: "num" as const,
            value: fields.limit,
            placeholder: "0 ₽",
            onChange: updateField("limit"),
        },
    ], [fields.name, fields.limit, updateField]);

    return (
        <DrawerCalculator
            isOpen={isOpen}
            onOpenChange={handleOpenChange}
            onSave={handleSave}
            buttonText="Добавить"
            calculatorKey={drawerKey}
            trigger={null}
            calculatorProps={{
                validationMessage,
                fields: calculatorFields,
            }}
        />
    );
};
