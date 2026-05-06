"use client";

import { DashboardItem } from "@/app/ui/components/dashboard-item";
import { useCategoryApi } from "@/app/categories/hooks/api/use-category-api";
import { ExpenseDrawer } from "@/app/ui/components/expense-drawer";
import { Categories } from "@/app/ui/components/categories";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {ExpensesCalendar} from "@/app/ui/components/expenses-calendar";
import Header from "@/app/ui/components/header/header";

export default function HomePage() {
    const { data, error, isLoading } = useCategoryApi();

    if (isLoading) return null;
    if (error) {
        return (
            <div className="mt-6 text-sm text-red-900">
                {error.message}
            </div>
        );
    }
    if (!data?.categories || !data?.totals) return null;

    return (
        <div>
            <Header />
            <main className="mt-6 relative mb-20">
                <ExpenseDrawer categories={data.categories} />
                <Link href="/categories">Категории</Link>
                <DashboardItem totals={data.totals} />
                <h2 className="text-sm font-bold text-[#78716c] uppercase tracking-wider pb-2">Расходы</h2>
                <Tabs defaultValue="categories" className="w-full">
                    <TabsList variant="line" className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="categories">По категориям</TabsTrigger>
                        <TabsTrigger value="days">По дням</TabsTrigger>
                    </TabsList>
                    <TabsContent value="categories">
                        <Categories
                            categories={data.categories}
                            archivedCategoriesMonthSpent={
                                data.archivedCategoriesMonthSpent
                            }
                        />
                    </TabsContent>
                    <TabsContent value="days">
                        <ExpensesCalendar />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
