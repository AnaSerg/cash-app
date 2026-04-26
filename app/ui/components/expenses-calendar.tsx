import {useExpenseApi} from "@/app/hooks/api/use-expense-api";
import {useState} from "react";
import {getDateString} from "@/lib/utils/get-date-string";
import useSWR from "swr";
import {DrawerModal} from "@/app/ui/components/drawer-modal";
import {ExpenseItem, ExpenseItemProps} from "@/app/categories/[id]/components/expense-item";
import {formatNumberWithSpace} from "@/app/lib/format-number-with-space";
import {formatDate} from "@/lib/utils/format-date";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const ExpensesCalendar = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json());

    const {calendarData} = useExpenseApi();
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { data: dayExpenses } = useSWR(
        selectedDay ? `/api/expense/${getDateString(selectedDay)}` : null,
        fetcher
    );

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const day = firstDay.getDay();
    const startOffset = day === 0 ? 6 : day - 1;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const blanks = Array(startOffset).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const cells = [...blanks, ...days];

    const today = now.getDate();

    const handleSelectedDay = (day: number) => {
        setSelectedDay(day);
        setIsDrawerOpen(true)
    }

    console.log(dayExpenses);

    return (
        <div className="grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
                <p key={day} className="text-[#78716c] text-sm text-center">{day}</p>
            ))}
            {cells.map((cell, i) => {
                const total = cell ? getTotal(calendarData, cell) : 0;
                const finalSum = total >= 1000 ? (total / 1000).toFixed(1) + "к" : total;
                return (
                    <div onClick={() => cell && handleSelectedDay(cell)} key={i} className={`h-14 rounded-xl relative flex items-center justify-center ${cell === today ? "bg-amber-400" : cell !== null ? "bg-stone-100" : cell}`}>
                        <p className="text-xs absolute top-1 left-1">{cell}</p>
                        <p className="font-medium mt-1">{total > 0 ? finalSum : ""}</p>
                    </div>
                );
            })}
            <DrawerModal
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                backgroundColor="white"
            >
                <div className="flex max-h-[min(75vh,32rem)] flex-col">
                    <div className="shrink-0">
                        <h2 className="text-left text-3xl font-bold mb-2">{formatNumberWithSpace(getTotal(calendarData, Number(selectedDay)))} ₽</h2>
                        <p className="text-left text-[#78716c] mb-4">{dayExpenses?.length > 0 && formatDate(dayExpenses[0].createdAt)}</p>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {dayExpenses?.length > 0 ? dayExpenses.map((expense: ExpenseItemProps) => (
                            <ExpenseItem expense={expense} key={expense.id}/>
                        )) : (
                            <p>Пока тут пусто</p>
                        )}
                    </div>
                </div>
            </DrawerModal>
        </div>
    )
}

const getTotal = (data: any, day: number) => {
    const found = data?.find(e => new Date(e.day).getDate() === day);
    return found?.total ?? 0;
}

/*
- типизировать функцию getTotal
- вынести отдельно вычисление дня ниже
 */