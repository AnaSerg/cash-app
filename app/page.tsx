"use client";

import { DashboardItem } from "@/app/ui/components/dashboard-item";
import { useCategoryApi } from "@/app/categories/hooks/api/use-category-api";
import { ExpenseDrawer } from "@/app/ui/components/expense-drawer";
import { Categories } from "@/app/ui/components/categories";

export default function HomePage() {
    const { data } = useCategoryApi();

    if (!data) return null;

    return (
        <div>
            <main className="mt-10 relative mb-20">
                <ExpenseDrawer categories={data.categories} />
                <DashboardItem totals={data.totals} />
                <Categories categories={data.categories} />
            </main>
        </div>
    );
}
