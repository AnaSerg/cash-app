import { useState } from "react";
import {Key} from "./key";

const RU_ROWS = [
    ["й","ц","у","к","е","н","г","ш","щ","з","х"],
    ["ф","ы","в","а","п","р","о","л","д","ж","э"],
    ["я","ч","с","м","и","т","ь","б","ю"],
];

type LetterKeyboardProps = {
    value: string;
    onChange: (value: string | ((prev: string) => string)) => void
}

export function LetterKeyboard({ value, onChange }: LetterKeyboardProps) {
    const [caps, setCaps] = useState(false);

    const press = (char: string) => {
        if (value.length >= 40) return;
        onChange(v => v + (caps ? char.toUpperCase() : char));
    };

    return (
        <div className="flex flex-col gap-1">
            {RU_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 justify-center">
                    {rowIndex === 2 && (
                        <button
                            onPointerDown={() => setCaps(c => !c)}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                            className={`flex items-center justify-center rounded-xl h-10 px-3 text-sm font-semibold select-none transition-colors ${caps ? "bg-stone-600 text-white" : "bg-[#B4A8ED] text-stone-700"}`}
                        >
                            ⇧
                        </button>
                    )}
                    {row.map(ch => (
                        <Key
                            key={ch}
                            label={caps ? ch.toUpperCase() : ch}
                            onClick={() => press(ch)}
                            className="h-10 flex-1 text-base"
                        />
                    ))}
                    {rowIndex === 2 && (
                        <button
                            onPointerDown={() => onChange(v => v.slice(0, -1))}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                            className="flex items-center justify-center rounded-xl h-10 px-3 bg-[#B4A8ED] text-stone-700 select-none"
                        >
                            ⌫
                        </button>
                    )}
                </div>
            ))}

            <div className="flex gap-1.5 justify-center mt-0.5">
                <Key label="пробел" onClick={() => press(" ")} className="h-10 flex-1 text-sm text-stone-400" />
                <Key label="." onClick={() => press(".")} className="h-10 w-12 text-base" />
            </div>
        </div>
    );
}