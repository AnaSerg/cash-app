"use client";

import {CategoryItems} from "@/app/categories/components/category-items";
import {CategoryDrawer} from "@/app/categories/components/category-drawer";

export default function Categories() {
    return (
        <div className="mt-8">
            <main>
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-4xl font-medium">Категории</h1>
                </div>
                <CategoryItems />
            </main>
            <CategoryDrawer />
        </div>
    );
}
