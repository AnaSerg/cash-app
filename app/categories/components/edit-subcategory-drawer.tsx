import {DrawerCalculator} from "@/app/ui/components/drawer-calculator";
import {useMemo} from "react";
import {Subcategory} from "../types";
import {useEditSubCategory} from "../hooks/use-edit-subcategory";

type Props = {
    subcategory: Subcategory;
    isOpen: boolean;
    drawerKey: number;
    onOpenChange: (value: boolean) => void;
};

export const EditSubcategoryDrawer = ({ subcategory, isOpen, drawerKey, onOpenChange }: Props) => {
    const { fields, updateField, resetFields, validationMessage, handleSave } = useEditSubCategory(
        subcategory,
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
            buttonText="Сохранить"
            calculatorKey={drawerKey}
            calculatorProps={{
                validationMessage,
                fields: calculatorFields,
            }}
        />
    );
};
