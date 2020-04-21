import React, {Component} from 'react';
import Field from "./field/Field";

type IField = {}

type IState = {
    size: number
    fields: IField[]
    steps: string[]
    widthField: number
}

class PlayingField extends Component<any, IState> {
    state = {
        size: 3,
        widthField: 110,
        fields: [],
        steps: []
    };

    componentDidMount(): void {
        this.constructionFields(this.state.size);
    }

    constructionFields = (size: number) => {
        const fields = [];
        for(let row = 1; row <= size; row++){

            for(let field = 1; field <= size; field++){
                if(row === 1) {
                    if(field === 1) fields.push({steps: ['right, bottom']});
                    else if (field === size ) fields.push({steps: ['bottom, left']});
                    else fields.push({steps: ['right, left']})
                }
                else if(row === size){
                    if(field === 1) fields.push({steps: ['top, right']});
                    else if (field === size ) fields.push({steps: ['top, left']});
                    else fields.push({steps: ['right, left']})
                }
                else {
                    if(field === 1) fields.push({steps: ['top, right, bottom']});
                    else if (field === size ) fields.push({steps: ['top, bottom, left']});
                    else fields.push({steps: ['top, right, bottom, left']})
                }
            }
        }
        this.setState({fields});
    };

    render() {
        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: `${this.state.widthField * 3}px`
            }}>
                {
                    this.state.fields.map((field: any, index: number) => <Field key={index} onClick={() => alert(5)}/>)
                }
            </div>
        );
    }
}

export default PlayingField;