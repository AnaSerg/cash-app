import {useCalculatorDrawer} from "@/app/hooks/use-calculator-drawer";
import {CategoryItemProps} from "@/app/categories/types";
import {useAddExpense} from "@/app/hooks/use-add-expense";
import {DrawerCalculator} from "@/app/ui/components/drawer-calculator";
import {useMemo} from "react";

export const ExpenseDrawer = ({ categories }: { categories: CategoryItemProps[] }) => {
    const { isDrawerOpen, calculatorKey, openDrawer } = useCalculatorDrawer();
    const { fields: expenseFields, update, updateField, resetFields, validationMessage, handleSaveExpense } = useAddExpense(() => openDrawer(false));

    const categoryOptions = useMemo(() =>
            categories.map(cat => ({
                label: cat.name,
                value: String(cat.id),
                subOptions: cat.subcategories?.map(sub => ({
                    label: sub.name,
                    value: String(sub.id),
                }))
            }))
        , [categories]);

    const fields = useMemo(() => [
        {
            key: "amount",
            type: "num" as const,
            value: expenseFields.amount,
            placeholder: "0 ₽",
            onChange: updateField("amount"),
        },
        {
            key: "comment",
            type: "letter" as const,
            value: expenseFields.comment,
            placeholder: "Комментарий...",
            onChange: updateField("comment"),
        },
    ], [expenseFields.amount, expenseFields.comment, updateField]);

    const handleDrawerOpenChange = (open: boolean) => {
        openDrawer(open);
        if (!open) resetFields();
    };

    return (
        <DrawerCalculator
            isOpen={isDrawerOpen}
            onOpenChange={handleDrawerOpenChange}
            onSave={handleSaveExpense}
            buttonText="Потратить"
            calculatorKey={calculatorKey}
            calculatorProps={{
                validationMessage,
                options: categoryOptions,
                selectedOption: expenseFields.categoryId || null,
                selectedSubOption: expenseFields.subCategoryId || null,
                onSelectedOptionChange: (value) => update({ categoryId: value ?? "" }),
                onSelectedSubOptionChange: (value) => update({ subCategoryId: value ?? "" }),
                fields,
            }}
        />
    );
};