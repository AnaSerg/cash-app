import {Key} from "./key";

const NUM_KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ",", "0", "⌫"];

type NumKeyboardProps = {
    value: string;
    onChange: (value: string | ((prev: string) => string)) => void
}

function hasDecimalSeparator(s: string): boolean {
    return /[.,]/.test(s);
}

export function NumKeyboard({ value, onChange }: NumKeyboardProps) {
    const handle = (button: string) => {
        if (button === "⌫") {
            onChange((value: string) => value.slice(0, -1));
            return;
        }
        if ((button === "." || button === ",") && hasDecimalSeparator(value)) {
            return;
        }
        if (value.length >= 9) {
            return;
        }
        const char = button === "," ? "," : button;
        onChange((v: string) => v + char);
    };

    return (
        <div className="grid grid-cols-3 gap-1.5">
            {NUM_KEYS.map(key => (
                <Key
                    key={key}
                    label={key}
                    onClick={() => handle(key)}
                    className={`h-12 text-xl ${key === "⌫" ? "bg-[#B4A8ED]" : ""} ${key === "," ? "text-2xl font-semibold" : ""}`}
                />
            ))}
        </div>
    );
}