import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    InputGroup, Form, FloatingLabel, ListGroup,
} from 'react-bootstrap';
import { TChildrenProps, TChildren, TOrder } from './interfaces';
import { texts } from './constants';
import { compareAsc, compareDesc } from './utils';

/**
 * Список дочерних элементов выбранного родителя
 * @constructor
 */
const Children = ({ parents, parentKey }: TChildrenProps) => {
    const [children, setChildren] = useState<TChildren[]>([]);
    const [query, setQuery] = useState<string>('');
    const [order, setOrder] = useState<TOrder>('asc');

    /**
     * При изменении родительского ключа обновляем state
     */
    useEffect(() => {
        if (!parentKey) {
            return;
        }

        // Т.к. в задании просят "вывести список дочерних элементов выбранного родителя",
        // то сохраняем только непосредственных детей родителя, а не всех потомков.
        const foundChildren = parents
            .find((parent) => parent.key === parentKey)
            .children;

        const sorted = [...foundChildren].sort(order === 'asc' ? compareAsc : compareDesc);
        setChildren(sorted);
    }, [parentKey]);

    /**
     * При изменении порядка сортировки обновляем state
     */
    useEffect(() => {
        const sorted = [...children].sort(order === 'asc' ? compareAsc : compareDesc);
        setChildren(sorted);
    }, [order]);

    /**
     * Обновляем запрос в state при пользовательском вводе
     * @param event - Событие ввода
     */
    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
    };

    /**
     * Обновляем порядок сортировки в state
     * @param event - Событие выбора в HTMLSelectElement
     */
    const handleChangeSort = (event: ChangeEvent<HTMLSelectElement>): void => {
        setOrder(event.target.value as TOrder);
    };

    return (
        <div className="float-end mt-5 me-5" style={{ width: '30%' }}>
            <h5>{texts.title}</h5>
            <InputGroup>
                <Form.Select className="w-50" onChange={handleChangeSort} value={order}>
                    <option value="asc">{texts.asc}</option>
                    <option value="desc">{texts.desc}</option>
                </Form.Select>
                <FloatingLabel className="w-50" controlId="query" label={texts.search}>
                    <Form.Control
                        type="search"
                        name="query"
                        placeholder={texts.search}
                        onChange={handleChangeQuery}
                    />
                </FloatingLabel>
            </InputGroup>
            <ListGroup className="mt-3">
                {children
                    .filter((child) => child.name.includes(query))
                    .map((child) => (
                        <ListGroup.Item key={child.key} variant="info">
                            {child.name}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
};

export default Children;
