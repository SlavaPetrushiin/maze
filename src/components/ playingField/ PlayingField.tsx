import React, {Component} from 'react';
import Field from "./field/Field";
import Step from '../step/Step';

type IField = {
    steps: string[]
}

type IState = {
    size: number
    fields: IField[]
    steps: string[]
    widthField: number
    start: number
    finish: number
}

class PlayingField extends Component<any, IState> {
    state = {
        size: 3,
        widthField: 110,
        fields: [],
        steps: [],
        start: 1,
        finish: 8
    };

    async componentDidMount() {
        await this.constructionFields(this.state.size);
        await this.getRandomStart(this.state.fields.length, 0);
        await this.generationSteps();
    }

    getRandomStart(max: number, min: number) {
        const start = Math.floor(Math.random() * (max - min) + min);
        this.setState({start});
    }

    generationSteps() {
        const steps = [];
        let start = this.state.start;
        let fieldsLength = this.state.fields.length;
        let prevField;
        let finish;

        while (fieldsLength) {
            const field = this.getRandomStep(start, steps, prevField);
            steps.push(field.step);

            start = field.nextField!;
            prevField = field.prevField;

            if (fieldsLength === 1) finish = start;

            fieldsLength--;
        }

        console.log(steps);
        console.log('finish', finish);
        if (finish) {
            this.setState({steps, finish});
        }
    }

    getRandomStep(value: number, steps: string[], prevField: number = value) {
        const field = this.state.fields[value] as IField;
        let fieldSteps = [];
        let step: string = '', nextField: number | null = null;

        //Проверка на повторения предыдущего шага step
        if (steps.length) {
            fieldSteps = field.steps.filter((step: string) => {
                return step !== steps[steps.length - 1];
            });
        }

        (function checkingPreviousField() {
            const indexStep = Math.floor(Math.random() * fieldSteps.length);
            const direction = field.steps[indexStep];

            switch (direction) {
                case 'top':
                    nextField = value - 3;
                    step = direction;
                    break;
                case 'right':
                    nextField = value + 1;
                    step = direction;
                    break;
                case 'bottom':
                    nextField = value + 3;
                    step = direction;
                    break;
                case 'left':
                    nextField = value - 1;
                    step = direction;
                    break;
            }
            if (nextField === prevField) {
                checkingPreviousField();
            }
        })();

        return {step, nextField, prevField: value};
    }

    constructionFields = (size: number) => {
        const fields = [];
        for (let row = 1; row <= size; row++) {

            for (let field = 1; field <= size; field++) {
                if (row === 1) {
                    if (field === 1) fields.push({steps: ['right', 'bottom']});
                    else if (field === size) fields.push({steps: ['bottom', 'left']});
                    else fields.push({steps: ['right', 'bottom', 'left']})
                } else if (row === size) {
                    if (field === 1) fields.push({steps: ['top', 'right']});
                    else if (field === size) fields.push({steps: ['top', 'left']});
                    else fields.push({steps: ['top', 'right', 'left']})
                } else {
                    if (field === 1) fields.push({steps: ['top', 'right', 'bottom']});
                    else if (field === size) fields.push({steps: ['top', 'bottom', 'left']});
                    else fields.push({steps: ['top', 'right', 'bottom', 'left']})
                }
            }
        }
        this.setState({fields});
    };

    handleClick = (index: number) => {
        if (index === this.state.finish) alert("You win")
        else alert("You loose")
    };

    render() {
        console.log('start', this.state.start);

        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: `${this.state.widthField * this.state.size}px`
            }}>
                {
                    this.state.fields.map((field: IField, index: number) => <Field
                            key={index}
                            start={this.state.start === index ? this.state.start : null}
                            finish={this.state.finish === index ? this.state.finish : null}
                            onClick={() => this.handleClick(index)}
                        />
                    )
                }
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: `${this.state.widthField * this.state.size}px`,
                    justifyContent: "space-between"
                }}>
                    {
                        this.state.steps.map((step: string, index: number) => <Step step={step} key={index}/>)
                    }
                </div>
            </div>
        );
    }
}

export default PlayingField;