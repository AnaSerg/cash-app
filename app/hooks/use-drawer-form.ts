import { useState } from "react";
import { useFormFields } from "./use-form-fields";

export const useDrawerForm = <T extends Record<string, string>>(initial: () => T) => {
    const { fields, updateFields, updateField, resetFields } = useFormFields(initial);
    const [validationMessage, setValidationMessage] = useState<string | null>(null);

    const update = (value: Partial<T> | ((prev: T) => T)) => {
        updateFields(value);
        setValidationMessage(null);
    };

    const withSave = async (
        validate: () => string | null,
        save: () => Promise<void>,
        onSuccess?: () => void,
    ) => {
        const error = validate();
        if (error) {
            setValidationMessage(error);
            return;
        }
        try {
            await save();
            resetFields();
            onSuccess?.();
        } catch (e) {
            console.error(e);
        }
    };

    return { fields, update, updateField, resetFields, validationMessage, withSave };
};
