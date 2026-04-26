import {Item, ItemContent, ItemDescription, ItemGroup} from "@/components/ui/item";
import {CategoryItemProps} from "@/app/categories/types";
import {formatNumberWithSpace} from "@/app/lib/format-number-with-space";
import {ProgressBar} from "@/app/ui/components/progress-bar";
import {useRouter} from "next/navigation";

export const Categories = ({
    categories,
    archivedCategoriesMonthSpent = 0,
}: {
    categories: CategoryItemProps[];
    archivedCategoriesMonthSpent?: number;
}) => {
    const router = useRouter();

    const handleClickCategory = (id: number) => {
        router.push(`/categories/${id}`);
    }

    return (
        <ItemGroup className="grid grid-cols-2 gap-2">
            {categories.map((category: CategoryItemProps) => {
                const percent = Math.min((category.totalSpent ? category.totalSpent / category.limit : 0) * 100, 100);

                return (
                    <Item onClick={() => handleClickCategory(category.id)} key={category.id} className="min-w-0 relative overflow-hidden border-0 rounded-2xl p-4 bg-[#f5f4f2]">
                        <ItemContent className="relative z-10 flex flex-col gap-3">

                            <ItemDescription className="truncate text-xs font-semibold uppercase tracking-wide opacity-60">
                                {category.name}
                            </ItemDescription>

                            <div>
                                <h2 className="text-2xl font-extrabold text-foreground leading-none">
                                    {formatNumberWithSpace(category.totalSpent ?? 0)} ₽
                                </h2>
                                <p className="text-xs text-muted-foreground mt-1">
                                    из {formatNumberWithSpace(category.limit)} ₽
                                </p>
                            </div>

                            <ProgressBar width={percent} size="small" />

                            <p className="text-xs font-semibold text-muted-foreground">
                                {formatNumberWithSpace(category.remaining ?? 0)} ₽ осталось
                            </p>

                        </ItemContent>
                    </Item>
                );
            })}
            {archivedCategoriesMonthSpent > 0 ? (
                <Item
                    className="min-w-0 opacity-50 relative overflow-hidden border border-dashed border-stone-300 rounded-2xl p-4 bg-stone-100/80 cursor-default"
                >
                    <ItemContent className="relative z-10 flex flex-col gap-3">
                        <ItemDescription className="truncate text-xs font-semibold uppercase tracking-wide opacity-60">
                            Архив
                        </ItemDescription>
                        <div>
                            <h2 className="text-2xl font-extrabold text-foreground leading-none">
                                {formatNumberWithSpace(archivedCategoriesMonthSpent)} ₽
                            </h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                за месяц · архивные категории
                            </p>
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground">
                            без лимита
                        </p>
                    </ItemContent>
                </Item>
            ) : null}
        </ItemGroup>
    )
}

// TODO: тут айтем вынести в компонент отдельный тоже