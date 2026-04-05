"use client";

import {Item, ItemContent, ItemDescription, ItemGroup} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";
import {Plus, Snail, Trash2, X} from "lucide-react";
import {CategoryItemProps, Subcategory} from "@/app/categories/types";
import {useCategoryApi} from "@/app/categories/hooks/api/use-category-api";
import {DrawerModal} from "@/app/ui/components/drawer-modal";
import {Calculator} from "@/app/ui/components/calculator/calculator";
import {useEditCategory} from "@/app/categories/hooks/use-edit-category";
import {useMemo, useState} from "react";
import {AddSubcategoryDrawer} from "./add-subcategory-drawer";
import {EditSubcategoryDrawer} from "./edit-subcategory-drawer";
import {useLongPress} from "@/app/hooks/use-long-press";
import {useSubCategoryApi} from "@/app/categories/hooks/api/use-subcategory-api";

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
            <ItemGroup className="grid grid-cols-1 gap-2">
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

    const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
    const [categoryDrawerKey, setCategoryDrawerKey] = useState(0);
    const [isSubCategoryDrawerOpen, setIsSubCategoryDrawerOpen] = useState(false);
    const [subCategoryDrawerKey, setSubCategoryDrawerKey] = useState(0);
    const [isEditSubCategoryDrawerOpen, setIsEditSubCategoryDrawerOpen] = useState(false);
    const [editSubCategoryDrawerKey, setEditSubCategoryDrawerKey] = useState(0);
    const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
    const [deletingSubId, setDeletingSubId] = useState<number | null>(null);

    const handleOpenCategoryDrawer = () => {
        setCategoryDrawerKey(k => k + 1);
        setIsCategoryDrawerOpen(true);
    };

    const handleOpenSubCategoryDrawer = () => {
        setSubCategoryDrawerKey(k => k + 1);
        setIsSubCategoryDrawerOpen(true);
    };

    const handleOpenEditSubCategoryDrawer = (sub: Subcategory) => {
        setDeletingSubId(null);
        setSelectedSubcategory(sub);
        setEditSubCategoryDrawerKey(k => k + 1);
        setIsEditSubCategoryDrawerOpen(true);
    };

    return (
        <Item variant="muted" className="rounded-2xl border-0 px-4 py-4">
            <ItemContent className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2" onClick={handleOpenCategoryDrawer}>
                        <ItemDescription className="text-xl font-medium text-foreground">
                            {category.name}
                        </ItemDescription>
                        <span className="text-sm font-medium text-muted-foreground bg-muted rounded-full px-2.5 py-1">
                            {category.limit.toLocaleString()} ₽
                        </span>
                    </div>
                    <Button
                        onClick={() => archiveCategory(category.id)}
                        size="icon-sm"
                        variant="ghost"
                        className="h-8 w-8 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {category.subcategories?.map(sub => (
                        <SubcategoryTag
                            key={sub.id}
                            sub={sub}
                            isDeleting={deletingSubId === sub.id}
                            onLongPress={() => setDeletingSubId(sub.id)}
                            onCancelDelete={() => setDeletingSubId(null)}
                            onEdit={() => handleOpenEditSubCategoryDrawer(sub)}
                        />
                    ))}
                    <Button
                        onClick={handleOpenSubCategoryDrawer}
                        className="rounded-full text-sm bg-[#E5E1DE]"
                        variant="secondary"
                    >
                        <Plus />{category.subcategories && category.subcategories.length > 0 ? "Добавить" : "Подкатегория" }
                    </Button>
                    <EditCategoryDrawer
                        category={category}
                        isOpen={isCategoryDrawerOpen}
                        drawerKey={categoryDrawerKey}
                        onOpenChange={setIsCategoryDrawerOpen}
                    />
                    <AddSubcategoryDrawer
                        category={category}
                        isOpen={isSubCategoryDrawerOpen}
                        drawerKey={subCategoryDrawerKey}
                        onOpenChange={setIsSubCategoryDrawerOpen}
                    />
                    {selectedSubcategory && (
                        <EditSubcategoryDrawer
                            key={selectedSubcategory.id}
                            subcategory={selectedSubcategory}
                            isOpen={isEditSubCategoryDrawerOpen}
                            drawerKey={editSubCategoryDrawerKey}
                            onOpenChange={setIsEditSubCategoryDrawerOpen}
                        />
                    )}
                </div>

            </ItemContent>
        </Item>
    );
};

type SubcategoryTagProps = {
    sub: Subcategory;
    isDeleting: boolean;
    onLongPress: () => void;
    onCancelDelete: () => void;
    onEdit: () => void;
};

const SubcategoryTag = ({ sub, isDeleting, onLongPress, onCancelDelete, onEdit }: SubcategoryTagProps) => {
    const { deleteSubCategory } = useSubCategoryApi();
    const longPressHandlers = useLongPress(onLongPress);

    const handleClick = () => {
        if (isDeleting) {
            onCancelDelete();
        } else {
            onEdit();
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteSubCategory(sub.id);
        onCancelDelete();
    };

    return (
        <span
            {...longPressHandlers}
            onClick={handleClick}
            className={`relative inline-flex items-center gap-1 text-sm font-medium text-white rounded-full px-3 py-1.5 cursor-pointer select-none transition-colors ${
                isDeleting ? "bg-red-400" : "bg-[#A3B565]"
            }`}
        >
            {sub.name}
            {isDeleting && (
                <button
                    onClick={handleDelete}
                    className="ml-0.5 rounded-full hover:bg-red-500 transition-colors"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            )}
        </span>
    );
};

// TODO: (drawer) вынести этот drawer отдельно, еще прям по папкам все разобраться, что и где, чтобы было единообразие

const EditCategoryDrawer = ({ category, isOpen, drawerKey, onOpenChange }: { category: CategoryItemProps, isOpen: boolean, drawerKey: number, onOpenChange: (value: boolean) => void }) => {
    const { fields, updateField, resetFields, validationMessage, handleSave } = useEditCategory(
        category,
        () => onOpenChange(false),
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

    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
        if (!open) resetFields();
    };

    return (

            <DrawerModal
                open={isOpen}
                onOpenChange={handleOpenChange}
                onSave={handleSave}
                buttonText="Сохранить"
            >
                <Calculator key={drawerKey} validationMessage={validationMessage} fields={calculatorFields} />
            </DrawerModal>
    );
};
