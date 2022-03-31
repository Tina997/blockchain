import React, {Component} from "react";
class Block extends Component{
    render(){
        /*const {timestamp, hash, data} = this.props.block;

        return(
            <div className="Block">
                <div>Hash: {hash}</div>
                <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
                <div>Data: {data}</div>
                <div>Array:</div>

            </div>
        )*/

        const {id, name} = this.props.block;
        return(
            <div className="Block">
                <div>Id: {id}</div>
                <div>Name: {name}</div>
            </div>
        )
    }
};

export default Block;