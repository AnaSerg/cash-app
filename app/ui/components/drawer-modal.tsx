import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import React from "react";

export interface DrawerModalProps {
    buttonText: string;
    children: React.ReactNode;
    title?: string;
    accessibilityTitle?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSave?: () => void | Promise<void>;
    saveDisabled?: boolean;
}

export function DrawerModal({
    open,
    onOpenChange,
    onSave,
    saveDisabled,
    buttonText,
    children,
    title,
    accessibilityTitle = "Диалоговое окно",
}: DrawerModalProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="bg-[#D7D2F1] mt-0">
                <DrawerHeader>
                    <DrawerTitle className={title ? "text-left" : "sr-only"}>
                        {title ?? accessibilityTitle}
                    </DrawerTitle>
                    {children}
                </DrawerHeader>
                <DrawerFooter>
                    <Button
                        className="h-12 bg-black text-white text-lg"
                        type="button"
                        disabled={saveDisabled}
                        onClick={() => void onSave?.()}
                    >
                        {buttonText}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
