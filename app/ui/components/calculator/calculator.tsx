import {useState} from "react";
import {handlePress} from "./utils/handle-press";

export const Calculator = () => {
    const [value, setValue] = useState("");
    const buttons = ["7","8","9","4","5","6","1","2","3",".","0","⌫"];
    return (
        <>
            <p className="bg-[#f5f4f2] h-16 rounded-md flex items-center justify-end p-2 text-3xl mb-4">{value || 0} ₽</p>
            <div className="grid grid-cols-3 gap-px bg-stone-200">
                {buttons.map((btn, index) => (
                    <button className="bg-white p-4 text-2xl" onClick={() => setValue(handlePress(value, btn))} key={index}>{btn}</button>
                ))}
            </div>
        </>
    )
}