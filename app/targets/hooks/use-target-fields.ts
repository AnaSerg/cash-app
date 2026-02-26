export const useTargetFields = () => {
    const targetFormFields = [
        {
            name: "title",
            type: "text" as const,
            required: true,
            placeholder: "На что копить"
        },
        {
            name: "sum",
            type: "number" as const,
            required: true,
            placeholder: "Какая сумма"
        },
        {
            name: "period",
            type: "number" as const,
            required: true,
            placeholder: "За сколько дней"
        }
    ];

    return {
        targetFormFields,
    }
}