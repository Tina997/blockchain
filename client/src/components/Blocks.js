import React, { Component } from "react";
import Block from "./Block";

class Blocks extends Component{
    state = {blocks: []};

    componentDidMount(){
        fetch(`${document.location.origin}/table`)
        .then(response => response.json())
        .then(json => this.setState({blocks: json}));
    }

    render(){
        console.log('this.state', this.state);
        return (
            <div>
                <h3>Blocks</h3>
                {
                    this.state.blocks.map(block =>{
                        return(
                            <Block key={block.hash} block ={block}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default Blocks;