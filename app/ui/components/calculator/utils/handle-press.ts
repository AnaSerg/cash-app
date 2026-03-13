export const handlePress = (value: string, btn: string) => {
    if (btn === "⌫") {
        return value.slice(0, -1);
    } else if (btn === ".") {
        if (!value.includes(".")) {
            return value + btn
        } else {
            return value
        }
    } else if (value.length < 9) {
            return value + btn;
    } else {
        return value
    }
}