import {Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle} from "@/components/ui/item";
import {Button} from "@/components/ui/button";
import {Pencil, Snail, X} from "lucide-react";
import {TargetItemProps} from "@/app/targets/types";
import {Spinner} from "@/components/ui/spinner";
import {useTargetApi} from "@/app/targets/hooks/use-target-api";

type TargetItem = {
    onEdit: (target: TargetItemProps) => void;
    onDelete: (id: number) => void;
}

export function TargetItems() {
    const { targets, error, isLoading } = useTargetApi();

    // TODO: доделать страницу с лоадером
    if (isLoading) return <Spinner className="size-8" />
    // TODO: добавить всплывашку с ошибкой
    if (error) return <div>Error: {error.message}</div>

    // TODO: вынести компонент пустого состояния отдельно

    if (targets.length === 0) {
        return (
            <div className="flex gap-2 justify-center mt-12">
                <Snail className="text-[#F39A60]"/>
                <p className="font-medium text-lg">Пока тут пусто</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full gap-2 mt-6">
            {targets.map((target: TargetItemProps) => (
                <TargetItem key={target.title} target={target} />
            ))}
        </div>
    )
}

function TargetItem({ target }: { target: TargetItemProps}) {
    return (
        <Item variant="muted">
            <ItemContent>
                <ItemDescription>{target.period} дней</ItemDescription>
                <ItemTitle>{target.title}</ItemTitle>
                <h1 className="font-bold">{target.sum}</h1>
            </ItemContent>
            <ItemActions>
                <Button
                    size="icon-sm"
                    className="rounded-full bg-gray-300"
                    aria-label="Edit"
                >
                    <Pencil />
                </Button>
                <Button
                    size="icon-sm"
                    className="rounded-full bg-gray-300"
                    aria-label="Delete"
                >
                    <X />
                </Button>
            </ItemActions>
        </Item>
    )
}