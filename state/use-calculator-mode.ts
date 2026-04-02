import { create } from 'zustand'

interface CalculatorModeStore {
    mode: string;
    setCalculatorMode: (newMode: string) => void;
}

export const useCalculatorMode = create<CalculatorModeStore>((set) => ({
    mode: "num",
    setCalculatorMode: (newMode: string) => set({ mode: newMode }),
}))