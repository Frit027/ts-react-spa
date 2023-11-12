import React, {
    useContext, useEffect, useState, ChangeEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../providers/auth-provider';
import { TTree } from '../../../server/interfaces';
import { TChildren, TParent, TOrder } from './interfaces';
import { compareAsc, compareDesc } from './utils';
import { texts } from './constants';

const DataBrowsing = () => {
    const [tree, setTree] = useState<TTree[]>([]);
    const [parents, setParents] = useState<TParent[]>([]);
    const [children, setChildren] = useState<TChildren[]>([]);
    const [order, setOrder] = useState<TOrder>('asc');
    const [query, setQuery] = useState<string>('');

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const findNodeParents = () => {
        const nodeParents: TParent[] = [];

        const findParent = (nodes: TTree[], level = 1) => {
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

    const fetchData = async () => {
        try {
            const { data } = await axios.get('/api/data');
            setTree(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
        fetchData();
    }, []);

    useEffect(() => {
        setParents(findNodeParents());
    }, [tree]);

    useEffect(() => {
        const sorted = [...children].sort(order === 'asc' ? compareAsc : compareDesc);
        setChildren(sorted);
    }, [order]);

    const handleClickParent = (key: string) => {
        console.log(key);
        const foundChildren = parents.find((parent) => parent.key === key).children;
        const sorted = [...foundChildren].sort(order === 'asc' ? compareAsc : compareDesc);
        setChildren(sorted);
    };

    const handleChangeSort = (event: ChangeEvent<HTMLSelectElement>) => {
        setOrder(event.target.value as TOrder);
    };

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <div>
            <div style={{ float: 'left' }}>
                {parents.map((parent) => <p key={parent.key} onClick={() => handleClickParent(parent.key)}>{`${'-'.repeat(parent.level)} ${parent.name}`}</p>)}
            </div>
            <div style={{ float: 'right' }}>
                <input type="text" onChange={handleChangeQuery} />
                <select onChange={handleChangeSort} value={order}>
                    <option value="asc">{texts.asc}</option>
                    <option value="desc">{texts.desc}</option>
                </select>
                {children
                    .filter((child) => child.name.includes(query))
                    .map((child) => <p key={child.key}>{child.name}</p>)}
            </div>
        </div>
    );
};

export default DataBrowsing;
