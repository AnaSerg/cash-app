import {formatDate} from "@/lib/utils/format-date";
import {formatNumberWithSpace} from "@/app/lib/format-number-with-space";
import {Subcategory} from "@/app/categories/types";

export type ExpenseItemByCategoryProps = {
    id: string;
    subcategoryId: number | null;
    subcategoryName: string | null;
    description?: string;
    date?: string;
    amount: string;
}

export type ExpenseItemByDayProps = {
    id: string;
    subcategory?: Subcategory;
    category: any;
    description?: string;
    date?: string;
    amount: string;
}

export const ExpenseItemByCategory = ({ expense }: { expense: ExpenseItemByCategoryProps }) => {
    return (
        <div className="flex justify-between gap-3 border-b last-of-type:border-0 pb-4 pt-4">
            <div>
                <p className="text-base text-left font-semibold mb-2">{expense.subcategoryName || "Другое"}</p>
                <p className="text-sm text-left font-medium mb-1 text-gray-600">{expense.description}</p>
                {expense.date && (
                    <p className="text-xs text-[#a8a29e]">{formatDate(expense.date)}</p>
                )}
            </div>
            <p className="bg-[#fee2e2] text-[#991b1b] text-sm font-semibold pt-1 pb-1 pl-2 pr-2 rounded-2xl self-center">-{formatNumberWithSpace(Number(expense.amount))} ₽</p>
        </div>
    )
}

export const ExpenseItemByDay = ({ expense }: { expense: ExpenseItemByDayProps }) => {
    return (
        <div className="flex justify-between gap-3 border-b last-of-type:border-0 pb-4 pt-4">
            <div>
                <p className="text-base text-left font-semibold mb-2">{expense.subcategory?.name || "Другое"}</p>
                <p className="text-sm text-left font-medium mb-1 text-gray-600">{expense.description}</p>
                {expense.date && (
                    <p className="text-xs text-[#a8a29e]">{formatDate(expense.date)}</p>
                )}
                {expense.category?.name && (
                    <p className="text-sm text-left text-[#a8a29e]">{expense.category.name}</p>
                )}
            </div>
            <p className="bg-[#fee2e2] text-[#991b1b] text-sm font-semibold pt-1 pb-1 pl-2 pr-2 rounded-2xl self-center">-{formatNumberWithSpace(Number(expense.amount))} ₽</p>
        </div>
    )
}