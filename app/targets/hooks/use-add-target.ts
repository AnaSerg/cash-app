import { useDrawerForm } from "@/app/hooks/use-drawer-form";
import { parseAmountInput } from "@/app/lib/format-number-with-space";
import { useTargetApi } from "./use-target-api";

export const useAddTarget = (onSuccess?: () => void) => {
    const { addTarget } = useTargetApi();
    const { fields, update, updateField, resetFields, validationMessage, withSave } = useDrawerForm(
        () => ({ title: "", sum: "", period: "" }),
    );

    const handleSave = () => withSave(
        () => {
            if (!fields.title.trim()) return "Введите название цели";
            const sum = parseAmountInput(fields.sum);
            if (!fields.sum.trim() || !Number.isFinite(sum) || sum <= 0) return "Введите сумму цели";
            const period = Number(fields.period);
            if (!fields.period.trim() || !Number.isInteger(period) || period <= 0) return "Введите количество дней";
            return null;
        },
        async () => {
            await addTarget({
                id: 0,
                title: fields.title.trim(),
                sum: parseAmountInput(fields.sum),
                period: Number(fields.period),
            });
        },
        onSuccess,
    );

    return { fields, update, updateField, resetFields, validationMessage, handleSave };
};
