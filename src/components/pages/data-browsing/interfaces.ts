export type TTree = {
    // ключ узла
    key: string;

    // имя узла
    name: string;

    // дети узла
    children?: TTree[];
};

export type TParent = {
    // ключ родителя
    key: string,

    // имя родителя
    name: string,

    // уровень глубины
    level: number,

    // дети родителя
    children: TTree[],
};
