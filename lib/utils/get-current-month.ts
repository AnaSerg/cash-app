export function getCurrentMonth() {
    return new Date().toLocaleString('ru-RU', { month: 'long' });
}