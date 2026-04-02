import {useState} from "react";

export const useCalculatorDrawer = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [calculatorKey, setCalculatorKey] = useState(0);

    const openDrawer = (open: boolean) => {
        setCalculatorKey(k => k + 1);
        setDrawerOpen(open);
    }

    return { isDrawerOpen, calculatorKey, openDrawer }
}