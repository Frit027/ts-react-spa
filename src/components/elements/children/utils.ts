import { TChildren } from './interfaces';

/**
 * Сравнение двух дочерних элементов родителя по их имени для сортировки по возрастанию
 * @param a - Первый ребёнок
 * @param b - Второй ребёнок
 * @returns {number} Результат сравнения двух строк
 */
export const compareAsc = (a: TChildren, b: TChildren): number => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

/**
 * Сравнение двух дочерних элементов родителя по их имени для сортировки по убыванию
 * @param a - Первый ребёнок
 * @param b - Второй ребёнок
 * @returns {number} Результат сравнения двух строк
 */
export const compareDesc = (a: TChildren, b: TChildren): number => {
    if (a.name < b.name) {
        return 1;
    }
    if (a.name > b.name) {
        return -1;
    }
    return 0;
};
