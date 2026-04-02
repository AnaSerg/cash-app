"use client";

import {useCalculatorDrawer} from "@/app/hooks/use-calculator-drawer";
import {DrawerCalculator} from "@/app/ui/components/drawer-calculator";
import {useMemo} from "react";
import {useAddTarget} from "@/app/targets/hooks/use-add-target";

export const AddTargetDrawer = () => {
    const { isDrawerOpen, calculatorKey, openDrawer } = useCalculatorDrawer();
    const { fields, updateField, resetFields, validationMessage, handleSave } = useAddTarget(() => openDrawer(false));

    const calculatorFields = useMemo(() => [
        {
            key: "title",
            type: "letter" as const,
            value: fields.title,
            placeholder: "На что копить",
            onChange: updateField("title"),
        },
        {
            key: "sum",
            type: "num" as const,
            value: fields.sum,
            placeholder: "0 ₽",
            onChange: updateField("sum"),
        },
        {
            key: "period",
            type: "num" as const,
            value: fields.period,
            placeholder: "Дней",
            onChange: updateField("period"),
        },
    ], [fields.title, fields.sum, fields.period, updateField]);

    const handleOpenChange = (open: boolean) => {
        openDrawer(open);
        if (!open) resetFields();
    };

    return (
        <DrawerCalculator
            isOpen={isDrawerOpen}
            onOpenChange={handleOpenChange}
            onSave={handleSave}
            buttonText="Добавить цель"
            calculatorKey={calculatorKey}
            calculatorProps={{
                validationMessage,
                fields: calculatorFields,
            }}
        />
    );
};
