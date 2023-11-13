import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { TTreeProps } from './interfaces';
import { texts } from './constants';

/**
 * Древовидная структура родительских элементов
 * @constructor
 */
const Parents = (props: TTreeProps) => {
    const { parents, parentKey, handleClick } = props;

    return (
        <div className="float-start mt-5 ms-5">
            <h5>{texts.title}</h5>
            <ListGroup>
                {parents.map((parent) => (
                    <ListGroup.Item
                        className="mt-1"
                        variant="secondary"
                        role="button"
                        active={parent.key === parentKey}
                        key={parent.key}
                        onClick={() => handleClick(parent.key)}
                    >
                        {`${texts.bullet.repeat(parent.level)}${parent.name}`}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Parents;
