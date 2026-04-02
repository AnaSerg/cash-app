"use client";

import {TargetItems} from "@/app/targets/components/target-items";
import {AddTargetDrawer} from "@/app/targets/components/add-target-drawer";

export default function Targets() {
    return (
        <div className="mt-8">
            <main>
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-4xl font-medium">Цели</h1>
                </div>
                <TargetItems />
            </main>
            <AddTargetDrawer />
        </div>
    );
}
