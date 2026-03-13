export function formatNumberWithSpace(number: number): string {
    return number.toLocaleString('ru-RU').replace(/,/g, ' ');
}