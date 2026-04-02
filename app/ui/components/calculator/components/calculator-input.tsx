type CalculatorInputProps = {
    value: string;
    type: "num" | "letter";
    active: boolean;
    onClick: () => void;
    placeholder?: string;
    label?: string;
}

export const CalculatorInput = ({ value, type, active, onClick, placeholder, label }: CalculatorInputProps) => {
    if (type === "num") {
        return (
            <div>
                <h3 className="text-xl font-medium text-foreground leading-none text-left mb-2 ml-2">{label}</h3>
                <p
                    onClick={onClick}
                    className="rounded-xl h-16 flex items-center justify-end p-2 text-3xl mb-4 bg-[#E8E4F5]"
                >
                    {value || placeholder}
                </p>
            </div>
        );
    }

    if (type === "letter") {
        return (
            <div
                onClick={onClick}
                className="rounded-xl px-4 h-12 flex items-center mb-4 cursor-pointer transition-all bg-[#E8E4F5]"
            >
        <span className={`truncate text-lg font-medium ${value ? "text-stone-900" : "text-stone-400"}`}>
          {value || placeholder}
        </span>
                {active && <span className="ml-0.5 w-0.5 h-4 bg-stone-900 animate-pulse rounded-full" />}
            </div>
        );
    }

    return null;
};