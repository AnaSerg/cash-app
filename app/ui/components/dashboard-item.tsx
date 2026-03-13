import {Item, ItemContent} from "@/components/ui/item";
import {ProgressBar} from "@/app/ui/components/progress-bar";
import Link from 'next/link';
import {formatNumberWithSpace} from "@/app/lib/format-number-with-space";

type spentInfoProps = {
    totalSpent: number;
    limit: number;
    remaining: number;
}

export function DashboardItem({ totals }: {totals: spentInfoProps}) {
    const { totalSpent, limit, remaining } = totals;
    const progressBarWidth = totalSpent * 100 / limit;
    return (
        <Link href="/targets/123">
            <Item className="bg-stone-900 mb-6 drop-shadow-md border-0 rounded-2xl" variant="muted">
                <ItemContent className="flex flex-col gap-4">

                    <div>
                        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">
                            Расходы за март
                        </p>
                        <h3 className="text-4xl font-black text-white leading-none">
                            {formatNumberWithSpace(totalSpent)} ₽
                        </h3>
                        <p className="text-xs text-stone-500 mt-1">
                            из {formatNumberWithSpace(limit)} ₽
                        </p>
                    </div>

                    <ProgressBar width={progressBarWidth} size="large" variant="dark" />

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs text-stone-400">Использовано</p>
                            <p className="text-sm font-semibold text-stone-300">{Math.round(progressBarWidth)}%</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-stone-400">Осталось</p>
                            <p className="text-base font-bold text-emerald-400">
                                {formatNumberWithSpace(remaining)} ₽
                            </p>
                        </div>
                    </div>

                </ItemContent>
            </Item>
        </Link>
    )
}