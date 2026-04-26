import { Badge } from "@/components/ui/badge"
import {NumKeyboard} from "./components/num-keyboard";
import {LetterKeyboard} from "./components/letter-keyboard";
import {CalculatorInput} from "@/app/ui/components/calculator/components/calculator-input";
import {useRef, useState} from "react";
import {useDragScroll} from "@/app/hooks/use-drag-scroll";

export type Option = {
    label: string;
    value: string;
    subOptions?: { label: string; value: string }[];
}

type CalculatorProps = {
    fields: FieldConfig[];
    options?: Option[];
    validationMessage?: string | null;
    selectedOption?: string | null;
    selectedSubOption?: string | null;
    onSelectedOptionChange?: (value: string | null) => void;
    onSelectedSubOptionChange?: (value: string | null) => void;
}

export type FieldConfig = {
    key: string;
    type: "num" | "letter";
    value: string;
    onChange: (value: string | ((prev: string) => string)) => void;
    placeholder?: string;
    label?: string;
}

export const Calculator = ({
    options,
    fields,
    validationMessage,
    selectedOption,
    onSelectedOptionChange,
    selectedSubOption,
    onSelectedSubOptionChange,
}: CalculatorProps) => {
    const [activeKey, setActiveKey] = useState(fields[0].key);
    const activeField = fields.find(f => f.key === activeKey)!;
    const selectedCategoryOption =
        selectedOption != null && selectedOption !== ""
            ? options?.find((o) => String(o.value) === String(selectedOption))
            : undefined;
    const optionsRef = useRef<HTMLDivElement>(null);
    const subOptionsRef = useRef<HTMLDivElement>(null);
    const optionsScrollHandlers = useDragScroll(optionsRef);
    const subOptionsScrollHandlers = useDragScroll(subOptionsRef);

    return (
        <>
            {fields.map(field => (
                <CalculatorInput
                    type={field.type}
                    key={field.key}
                    value={field.value}
                    active={activeKey === field.key}
                    onClick={() => setActiveKey(field.key)}
                    placeholder={field.placeholder}
                    label={field.label}
                />
            ))}
            <div
                ref={optionsRef}
                {...optionsScrollHandlers}
                data-vaul-no-drag
                className="flex gap-2 overflow-x-auto pb-1 mt-4 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
            >
                {options?.map((option) => (
                        <Badge
                            key={option.value}
                            onClick={() => onSelectedOptionChange?.(option.value)}
                            className={`pt-2 pl-4 pb-2 pr-4 text-sm font-semibold cursor-pointer whitespace-nowrap flex-shrink-0 transition-colors ${
                                String(selectedOption ?? "") === String(option.value)
                                    ? "bg-[#FAF09C]"
                                    : "bg-orange-50"
                            }`}
                        >
                            {option.label}
                        </Badge>
                ))}
            </div>

            {selectedCategoryOption?.subOptions && selectedCategoryOption.subOptions.length > 0 ? (
                <div
                    ref={subOptionsRef}
                    {...subOptionsScrollHandlers}
                    data-vaul-no-drag
                    className="flex gap-2 overflow-x-auto pb-1 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                >
                    {selectedCategoryOption.subOptions.map((subOption) => (
                        <Badge
                            key={`${String(selectedCategoryOption.value)}-${subOption.value}`}
                            onClick={() => onSelectedSubOptionChange?.(subOption.value)}
                            className={`pt-2 pl-4 pb-2 pr-4 text-sm font-medium cursor-pointer whitespace-nowrap flex-shrink-0 transition-colors ${
                                String(selectedSubOption ?? "") === String(subOption.value)
                                    ? "bg-[#FBDCE1]"
                                    : "bg-orange-50"
                            }`}
                        >
                            {subOption.label}
                        </Badge>
                    ))}
                </div>
            ) : null}

            <div className="flex-shrink-0">
                {activeField.type === "num"
                    ? <NumKeyboard value={activeField.value} onChange={activeField.onChange} />
                    : <LetterKeyboard value={activeField.value} onChange={activeField.onChange} />
                }
            </div>

            {validationMessage ? (
                <p
                    role="alert"
                    aria-live="polite"
                    className="text-sm font-medium text-red-900 mt-2"
                >
                    {validationMessage}
                </p>
            ) : null}
        </>
    );
};
