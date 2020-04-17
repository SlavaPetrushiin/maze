import React, {Component} from 'react';
import Field from "./field/Field";
import Row from "./row/Row";

type IState = {
    fields: number
}

class PlayingField extends Component<any, IState> {
    state = {
        fields: 3
    };
    render() {
        return (
            <div>
                <Row>
                    <Field/>
                    <Field/>
                    <Field/>
                </Row>
                <Row >
                    <Field/>
                    <Field/>
                    <Field/>
                </Row>
                <Row >
                    <Field/>
                    <Field/>
                    <Field/>
                </Row>
            </div>
        );
    }
}

export default PlayingField;