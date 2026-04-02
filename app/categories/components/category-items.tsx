"use client";

import {Item, ItemContent, ItemDescription, ItemGroup} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";
import {Pencil, Snail, X} from "lucide-react";
import {CategoryItemProps} from "@/app/categories/types";
import {useCategoryApi} from "@/app/categories/hooks/use-category-api";
import {DrawerModal} from "@/app/ui/components/drawer-modal";
import {Calculator} from "@/app/ui/components/calculator/calculator";
import {useEditCategory} from "@/app/categories/hooks/use-edit-category";
import {useMemo, useState} from "react";

export function CategoryItems() {
    const { data, error, isLoading } = useCategoryApi();

    if (isLoading) return <Spinner className="size-8" />;
    if (error) return <div>Error: {error.message}</div>;

    if (data.categories.length === 0) {
        return (
            <div className="flex gap-2 justify-center mt-12">
                <Snail className="text-[#F39A60]"/>
                <p className="font-medium text-lg">Пока тут пусто</p>
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-xl flex-col gap-6 mt-6">
            <ItemGroup className="grid grid-cols-2 gap-2">
                {data.categories.map((category: CategoryItemProps) => (
                    !category.archived &&
                        <CategoryItem key={category.name} category={category} />
                ))}
            </ItemGroup>
        </div>
    );
}

const CategoryItem = ({ category }: { category: CategoryItemProps }) => {
    const { archiveCategory } = useCategoryApi();

    return (
        <Item variant="muted" className="relative">
            <ItemContent>
                <ItemDescription className="text-center">{category.name}</ItemDescription>
                <h2 className="font-medium text-lg text-center">{category.limit} ₽</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <EditCategoryDrawer category={category} />
                    <Button
                        onClick={() => archiveCategory(category.id)}
                        size="icon-sm"
                        className="rounded-full bg-gray-300"
                    >
                        <X />
                    </Button>
                </div>
            </ItemContent>
        </Item>
    );
};

const EditCategoryDrawer = ({ category }: { category: CategoryItemProps }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [key, setKey] = useState(0);

    const { fields, updateField, resetFields, validationMessage, handleSave } = useEditCategory(
        category,
        () => setIsOpen(false),
    );

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

    const handleOpen = () => {
        setKey(k => k + 1);
        setIsOpen(true);
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) resetFields();
    };

    return (
        <>
            <Button onClick={handleOpen} size="icon-sm" className="rounded-full bg-gray-300">
                <Pencil />
            </Button>
            <DrawerModal
                open={isOpen}
                onOpenChange={handleOpenChange}
                onSave={handleSave}
                buttonText="Сохранить"
            >
                <Calculator key={key} validationMessage={validationMessage} fields={calculatorFields} />
            </DrawerModal>
        </>
    );
};
