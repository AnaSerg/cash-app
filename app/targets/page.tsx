"use client";

import Form from "@/app/ui/components/form";
import {DrawerModal} from "@/app/ui/components/drawer-modal";
import {Button} from "@/components/ui/button";
import {useTargetApi} from "@/app/targets/hooks/use-target-api";
import {useState} from "react";
import {TargetItemProps} from "@/app/targets/types";
import {useTargetFields} from "@/app/targets/hooks/use-target-fields";
import {TargetItems} from "@/app/targets/components/target-items";

export default function Targets() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [editingTarget, setEditingTarget] = useState<TargetItemProps | null>(null);
    const { addTarget } = useTargetApi();
    const { targetFormFields } = useTargetFields();

    const submitAdd = async (data: TargetItemProps) => {
        try {
            await addTarget(data);
        } catch (error) {
            console.error('Error adding target:', error);
        }
    };

    const handleAdd = () => {
        setEditingTarget(null);
        setDrawerOpen(true);
    }

    return (
        <div className="mt-8">
            <main>
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-4xl font-medium">Цели</h1>
                    <Button onClick={handleAdd}>Добавить</Button>
                    <DrawerModal
                        open={isDrawerOpen}
                        onOpenChange={(open) => setDrawerOpen(open)}
                        buttonText="Сохранить"
                        title={editingTarget ? "Редактировать цель" : "Добавить цель"}
                        id="targets"
                    >
                        <Form
                            id="targets"
                            submit={submitAdd}
                            formFields={targetFormFields}
                            defaultValues={{}}
                        />
                    </DrawerModal>
                </div>
                <TargetItems />
            </main>
        </div>
    );
}
