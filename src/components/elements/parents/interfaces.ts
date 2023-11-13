import { TParent } from '../../pages/data-browsing/interfaces';

export type TTreeProps = {
    // массив родительских элементов
    parents: TParent[],

    // ключ выбранного родительского элемента
    parentKey: string,

    // обработчик клика по родителю
    handleClick: (key: string) => void,
};
