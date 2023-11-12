import React, { ChangeEvent, useState } from 'react';
import { TChildrenProps } from './interfaces';
import { texts } from './constants';

/**
 * Список дочерних элементов выбранного родителя
 * @constructor
 */
const Children = (props: TChildrenProps) => {
    const [query, setQuery] = useState<string>('');

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const { children, handleChangeSort, order } = props;

    return (
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
    );
};

export default Children;
