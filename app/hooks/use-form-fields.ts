import {useCallback, useRef, useState} from "react";

export const useFormFields = <T extends Record<string, unknown>>(initial: () => T) => {
    const [fields, setFields] = useState<T>(initial);
    const initialRef = useRef(initial);

    const updateFields = (value: Partial<T> | ((prev: T) => T)) => {
        setFields(f => {
            const next = typeof value === "function" ? value(f) : { ...f, ...value };
            return next;
        });
    };

    const updateField = (key: keyof T) => (value: string | ((prev: string) => string)) => {
        setFields(f => ({
            ...f,
            [key]: typeof value === "function" ? value(f[key] as string) : value,
        }));
    };

    const resetFields = useCallback(() => {
        setFields(initialRef.current());
    }, []);

    return { fields, updateFields, updateField, resetFields };
};