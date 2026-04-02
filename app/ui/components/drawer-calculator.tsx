import {ComponentProps} from "react";
import {Button} from "@/components/ui/button";
import {DrawerModal} from "@/app/ui/components/drawer-modal";
import {Calculator} from "./calculator/calculator";

type DrawerCalculatorProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  buttonText: string;
  calculatorKey: number;
  calculatorProps: ComponentProps<typeof Calculator>;
}

export const DrawerCalculator = ({ isOpen, onOpenChange, onSave, buttonText, calculatorProps, calculatorKey }: DrawerCalculatorProps) => {
  return (
    <>
      <div className="fixed bottom-0 right-4 left-4 z-20 bg-[linear-gradient(to_top,transparent,#e9e3df_65%)]">
        <Button className="w-full mb-4 text-lg h-12" onClick={() => onOpenChange(true)}>
          {buttonText}
        </Button>
      </div>
      <DrawerModal open={isOpen} onOpenChange={onOpenChange} onSave={onSave} buttonText={buttonText}>
          <Calculator
              key={calculatorKey}
              {...calculatorProps}
          />
      </DrawerModal>
    </>
  );
};