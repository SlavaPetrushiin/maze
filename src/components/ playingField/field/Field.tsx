import React from 'react';
import cls from './Field.module.css';

type IProps = {
    onClick: () => void
}

const Field = (props: IProps) => {
    return (
        <div
            className={cls.field}
            onClick={props.onClick}
        />
    )
};

export default Field;