import React, { Component } from 'react'

export class Cell extends Component {
    constructor(props){
        super(props);
        this.state = {
            candidates: [1,2,3,4,5,6,7,8,9],
            value: this.props.value,
            valid: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        console.log(`Clicked cell: ${this.props}`)
    }

    handleChange(event){
        console.log(`Cell ${this.props.idx} change ${event.target.value}`);

        this.setState({
            value: event.target.value,
            valid: true,
        })
    }


    render() {
        return (
            
            <td
                className="cell" 
                idx={this.props.idx}
                row={this.props.row}
                col={this.props.col}
                box={this.props.box}
                id={this.props.id}
            >

                <input 
                    size="1" 
                    maxLength="1" 
                    defaultValue={''} 
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                >
                </input>   
            </td>
            
        )
    }
}

export default Cell
