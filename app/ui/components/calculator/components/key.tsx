import {useState} from "react";

type KeyProps = {
    label: string;
    onClick: () => void;
    className?: string;
}

export function Key({ label, onClick, className = "" }: KeyProps) {
    const [pressed, setPressed] = useState(false);
    return (
        <button
            onPointerDown={() => { setPressed(true); onClick(); }}
            onPointerUp={() => setPressed(false)}
            onPointerLeave={() => setPressed(false)}
            style={{ WebkitTapHighlightColor: "transparent" }}
            className={`flex items-center justify-center rounded-xl text-stone-900 font-medium select-none transition-colors duration-75 ${pressed ? "bg-[#B4A8ED]" : "bg-[#CDC7EA]"} ${className}`}
        >
            {label}
        </button>
    );
}