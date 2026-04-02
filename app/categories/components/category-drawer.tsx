import {useCalculatorDrawer} from "@/app/hooks/use-calculator-drawer";
import {DrawerCalculator} from "@/app/ui/components/drawer-calculator";
import {useMemo} from "react";
import {useAddCategory} from "@/app/categories/hooks/use-add-category";

export const CategoryDrawer = () => {
    const { isDrawerOpen, calculatorKey, openDrawer } = useCalculatorDrawer();
    const { fields, updateField, resetFields, validationMessage, handleSave } = useAddCategory(() => openDrawer(false));

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

    const handleOpenChange = (open: boolean) => {
        openDrawer(open);
        if (!open) resetFields();
    };

    return (
        <DrawerCalculator
            isOpen={isDrawerOpen}
            onOpenChange={handleOpenChange}
            onSave={handleSave}
            buttonText="Добавить"
            calculatorKey={calculatorKey}
            calculatorProps={{
                validationMessage,
                fields: calculatorFields,
            }}
        />
    );
};
