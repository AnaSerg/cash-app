import {Item, ItemContent} from "@/components/ui/item";
import {ProgressBar} from "@/app/ui/components/progress-bar";
import Link from 'next/link';

export function DashboardItem() {
    return (
        <Link href="/targets/123">
            <Item className="bg-[#BAC6EF] mb-6 drop-shadow-md" variant="muted">
                <ItemContent>
                    <p className="text-white">Осталось 20 дней</p>
                    <h2 className="font-medium text-lg">Накопить на новый диван</h2>
                    <h3 className="font-medium text-2xl mb-4">20000 из 35000</h3>
                    <ProgressBar />
                </ItemContent>
            </Item>
        </Link>
    )
}