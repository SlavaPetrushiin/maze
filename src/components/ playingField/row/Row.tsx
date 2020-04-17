import React from 'react';
import cls from './Row.module.css';

export interface IProps  {
    children: React.ReactNode
}

const Row = (props: IProps) => {
    return (
        <div className={cls.row}>
            {props.children}
        </div>
    )
};

export default Row;