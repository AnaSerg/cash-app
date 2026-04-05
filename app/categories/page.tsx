"use client";

import {CategoryItems} from "@/app/categories/components/category-items";
import {CategoryDrawer} from "@/app/categories/components/category-drawer";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useState} from "react";

export default function Categories() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerKey, setDrawerKey] = useState(0);

    const handleOpen = () => {
        setDrawerKey(k => k + 1);
        setIsDrawerOpen(true);
    };

    return (
        <div className="mt-8">
            <main>
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-4xl font-medium">Категории</h1>
                    <Button onClick={handleOpen} size="icon-lg" className="rounded-full"><Plus/></Button>
                </div>
                <CategoryItems />
            </main>
            <CategoryDrawer isOpen={isDrawerOpen} drawerKey={drawerKey} onOpenChange={setIsDrawerOpen}  />
        </div>
    );
}
