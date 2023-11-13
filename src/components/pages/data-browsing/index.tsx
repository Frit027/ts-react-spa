import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../providers/auth-provider';
import { TTree, TParent } from './interfaces';
import Parents from '../../elements/parents';
import Children from '../../elements/children';

/**
 * Приватная страница сайта для просмотра информации с сервера
 * @constructor
 */
const DataBrowsing = () => {
    const [tree, setTree] = useState<TTree[]>([]);
    const [parents, setParents] = useState<TParent[]>([]);
    const [parentKey, setParentKey] = useState<string>('');
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    /**
     * Получаем данные по API через GET-запрос
     */
    const fetchData = async (): Promise<void> => {
        try {
            const { data } = await axios.get('/api/data');
            setTree(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * При открытии страницы перенаправляем на страницу входа, если пользователь не авторизован
     * Иначе загружаем данные с сервера
     */
    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
        fetchData();
    }, []);

    /**
     * Ищем все родительские элементы
     * @returns {TParent[]} Массив найденных родительских элементов
     */
    const findNodeParents = (): TParent[] => {
        const nodeParents: TParent[] = [];

        /**
         * Рекурсивно проходим по объекту и сохраняем найденных родителей
         * @param nodes - Узлы дерева
         * @param level - Глубина дерева
         */
        const findParent = (nodes: TTree[], level = 1): void => {
            nodes.forEach((node) => {
                if ('children' in node && node.children.length) {
                    nodeParents.push({
                        key: node.key,
                        name: node.name,
                        children: node.children,
                        level,
                    });
                    findParent(node.children, level + 1);
                }
            });
        };
        findParent(tree);

        return nodeParents;
    };

    /**
     * При получении дерева с сервера находим и сохраняем родительские элементы в state
     */
    useEffect(() => {
        const nodeParents = findNodeParents();
        setParents(nodeParents);
    }, [tree]);

    /**
     * Обновляем state новым значением ключа
     * @param key - Ключ родителя, по которому кликнули
     */
    const handleClickParent = (key: string): void => {
        setParentKey(key);
    };

    return (
        <div>
            <Parents parents={parents} parentKey={parentKey} handleClick={handleClickParent} />
            <Children parents={parents} parentKey={parentKey} />
        </div>
    );
};

export default DataBrowsing;
