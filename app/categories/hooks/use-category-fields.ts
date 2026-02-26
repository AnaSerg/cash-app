export const useCategoryFields = () => {
    const categoryFormFields = [
        {
            name: "name",
            type: "text" as const,
            required: true,
            placeholder: "Название"
        },
        {
            name: "limit",
            type: "number" as const,
            required: true,
            placeholder: "Лимит"
        },
    ];

    return {
        categoryFormFields,
    }
}