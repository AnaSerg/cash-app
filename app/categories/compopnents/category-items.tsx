import {Item, ItemContent, ItemDescription, ItemGroup} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner"
import {Button} from "@/components/ui/button";
import {Pencil, Snail, X} from "lucide-react";
import {CategoryItemProps} from "@/app/categories/types";
import {useCategoryApi} from "@/app/categories/hooks/use-category-api";

type CategoryItem = {
    onEdit: (category: CategoryItemProps) => void;
    onDelete: (id: number) => void;
}

export function CategoryItems({onEdit, onDelete}: CategoryItem) {
    const { data, error, isLoading } = useCategoryApi();

    // TODO: доделать страницу с лоадером
    if (isLoading) return <Spinner className="size-8" />
    // TODO: добавить всплывашку с ошибкой
    if (error) return <div>Error: {error.message}</div>

    if (data.categories.length === 0) {
        return (
            <div className="flex gap-2 justify-center mt-12">
                <Snail className="text-[#F39A60]"/>
                <p className="font-medium text-lg">Пока тут пусто</p>
            </div>
        )
    }

    return (
        <div className="flex w-full max-w-xl flex-col gap-6 mt-6">
            <ItemGroup className="grid grid-cols-3 gap-2">
                {data.categories.map((category: CategoryItemProps) => (
                    !category.archived &&
                            <CategoryItem key={category.name} category={category} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </ItemGroup>
        </div>
    )
}

const CategoryItem = ({ category, onEdit, onDelete }: {  category: CategoryItemProps, onEdit: (category: CategoryItemProps) => void, onDelete: (id: number) => void }) => {
    return (
        <Item variant="muted" className="relative">
            <ItemContent>
                <ItemDescription className="text-center">{category.name}</ItemDescription>
                <h2 className="font-medium text-lg text-center">{category.limit}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <Button onClick={() => onEdit(category)} size="icon-xs" className="rounded-full bg-gray-300">
                        <Pencil />
                    </Button>
                    <Button onClick={() => onDelete(category.id)} size="icon-xs" className="rounded-full bg-gray-300">
                        <X />
                    </Button>
                </div>
            </ItemContent>
        </Item>
    )
}