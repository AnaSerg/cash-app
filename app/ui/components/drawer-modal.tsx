import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import React from "react";

type DrawerModalProps = {
    title?: string;
    buttonText: string;
    children: React.ReactNode;
    id?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function DrawerModal({open, onOpenChange, title, buttonText, children, id}: DrawerModalProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="bg-white">
                <DrawerHeader>
                    {title && <DrawerTitle>{title}</DrawerTitle>}
                    {children}
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button type="submit" form={id}>{buttonText}</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}