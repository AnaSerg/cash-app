export const getDateString = (date: number) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
}