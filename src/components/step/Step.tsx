import React from 'react';
import cls from './Step.module.css';

type IProps = {
    step: string
}

const Step = (props: IProps) => {
    let step: any;

    switch (props.step) {
        case 'top':
            step = <span>&#8593;</span>
            break;
        case 'right':
            step = <span>&#8594;</span>;
            break;
        case 'bottom':
            step = <span>&#8595;</span>;
            break;
        case 'left':
            step = <span>&#8592;</span>;
    }

    const renderStep = () => {
        return step
    };

    return (
        <div className={cls.step}>
            {step}
        </div>
    )
};

export default Step;