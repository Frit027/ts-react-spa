import { TTree } from '../../../server/interfaces';

export type TParent = {
    key: string,
    name: string,
    level: number,
    children: TTree[],
};

export type TChildren = {
    key: string,
    name: string,
};

const ASC = 'asc';
const DESC = 'desc';
export type TOrder = typeof ASC | typeof DESC;
