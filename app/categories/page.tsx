"use client";

import Form from "@/app/ui/components/form";
import { DrawerModal } from "@/app/ui/components/drawer-modal";
import {CategoryItems} from "@/app/categories/compopnents/category-items";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useCategoryApi} from "@/app/categories/hooks/use-category-api";
import {useCategoryFields} from "@/app/categories/hooks/use-category-fields";
import {CategoryItemProps} from "@/app/categories/types";

export default function Categories() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryItemProps | null>(null);
    const { addCategory, deleteCategory, editCategory } = useCategoryApi();
    const { categoryFormFields } = useCategoryFields();

    const submitAdd = async (data: CategoryItemProps) => {
        try {
            await addCategory(data);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const submitEdit = async (data: CategoryItemProps) => {
        try {
            if(!editingCategory?.id) {
                return;
            }
            await editCategory({
                id: editingCategory?.id,
                name: data.name,
                limit: Number(data.limit),
            });
            setDrawerOpen(false);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEdit = (category: CategoryItemProps) => {
        setEditingCategory(category);
        setDrawerOpen(true);
    }

    const handleAdd = () => {
        setEditingCategory(null);
        setDrawerOpen(true);
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="mt-8">
            <main>
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-4xl font-medium">Категории</h1>
                    <Button onClick={handleAdd}>Добавить</Button>
                    <DrawerModal
                        open={isDrawerOpen}
                        onOpenChange={(open) => setDrawerOpen(open)}
                        buttonText="Сохранить"
                        title={editingCategory ? "Редактировать категорию" : "Добавить категорию"}
                        id="categories"
                    >
                        <Form
                            id="categories"
                            submit={editingCategory ? submitEdit : submitAdd}
                            formFields={categoryFormFields}
                            defaultValues={editingCategory ? { name: editingCategory.name, limit: editingCategory.limit, category: "" } : { category: "" }}
                        />
                    </DrawerModal>
                </div>
                <CategoryItems onEdit={handleEdit} onDelete={handleDelete} />
            </main>
        </div>
    );
}
