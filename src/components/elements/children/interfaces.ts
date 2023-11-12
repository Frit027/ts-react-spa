import { TParent } from '../../pages/data-browsing/interfaces';

export type TChildrenProps = {
    // массив родительских элементов
    parents: TParent[],

    // ключ выбранного родительского элемента
    parentKey: string,
};

export type TChildren = {
    // ключ дочернего узла
    key: string,

    // имя дочернего узла
    name: string,
};

const ASC = 'asc';
const DESC = 'desc';
export type TOrder = typeof ASC | typeof DESC;
