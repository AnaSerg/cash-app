"use client";

import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useParams} from "next/navigation";
import {useCategoryByIdApi} from "./hooks/use-category-by-id-api";
import {ProgressBar} from "@/app/ui/components/progress-bar";
import Link from 'next/link';
import {ExpenseItemByCategory, ExpenseItemByCategoryProps} from "./components/expense-item";


export default function CategoryPage() {
    const { id } = useParams();
    const { data: category } = useCategoryByIdApi(Number(id));

    if (!category) {
        return null;
    }

    const progressBarWidth = category.totalSpent * 100 / category.limit || 0;

    console.log(category);

    return (
        <div className="h-screen flex flex-col">
            <div className="p-4 relative overflow-hidden">
                <div className="absolute -top-10 -right-10">
                    <svg viewBox="0 0 200 200" width="200" height="200"><path fill="#FFF0D1" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-1C87,14.2,81.4,28.4,73.1,40.9C64.8,53.4,53.8,64.1,40.9,71.3C28,78.5,14,82.1,-0.9,83.5C-15.8,85,-31.6,84.2,-44.8,77.5C-58,70.8,-68.6,58.1,-75.8,43.8C-83,29.5,-86.8,14.8,-85.5,0.8C-84.2,-13.2,-77.8,-26.4,-69.4,-37.6C-61,-48.8,-50.6,-58,-38.6,-65.8C-26.6,-73.6,-13.3,-80,1.3,-82.1C15.9,-84.2,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)"/></svg>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/">
                        <Button size="icon-lg" className="rounded-full bg-[rgba(0,0,0,0.08)]" variant="secondary"><ArrowLeft /></Button>
                    </Link>
                    <h1 className="font-semibold text-lg text-[#78350f]">{category.name}</h1>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm opacity-70 text-[#78350f] mb-2">Потрачено</p>
                    <p className="text-4xl font-bold text-[#1c1917] mb-1">{category.totalSpent} ₽</p>
                    <p className="text-sm text-[#78350f] mb-4">из {category.limit} ₽</p>
                    <ProgressBar width={progressBarWidth} size="large" />
                    <p className="text-sm text-[#78350f] font-semibold self-end mt-2">Осталось {category.remaining} ₽</p>
                </div>
            </div>
            <div className="rounded-t-4xl bg-white flex-1 flex flex-col overflow-hidden">
                <p className="text-sm font-bold text-[#78716c] uppercase tracking-wider p-4 pb-2">История</p>
                <div className="overflow-y-auto flex-1 px-4">
                    {category.allExpenses.map((expense: ExpenseItemByCategoryProps) => (
                        <ExpenseItemByCategory expense={expense} key={expense.id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

// TODO: если нет расходов, то написать, что пусто

