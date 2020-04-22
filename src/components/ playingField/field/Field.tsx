import React from 'react';
import cls from './Field.module.css';

type IProps = {
    onClick: () => void
    finish: number | null
    start: number | null
}

const Field = (props: IProps) => {
   let start, finish;

   if(props.finish || props.finish === 0) finish = 'finish';
    if(props.start || props.start === 0) finish = 'start';

    return (
        <div
            className={cls.field}
            onClick={props.onClick}
        >
            {start && <span>{start}</span>}
            {finish && <span>{finish}</span>}
        </div>
    )
};

export default Field;