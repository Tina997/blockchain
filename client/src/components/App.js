import React, {Component } from 'react';
import Blocks from './Blocks';
import logo from '../assets/Logo.png';

class App extends Component{
    state = {walletInfo: {}}

    componentDidMount(){
        fetch('https://young-basin-12073.herokuapp.com/api/wallet-info')
        .then(response=>response.json())
        .then(json => this.setState({walletInfo: json}));
    }

    render() {
        const {address, balance}= this.state.walletInfo;

        return(
            <div className='App'>
                <img className = 'logo' src={logo}></img>
                <br></br>
               <div>Welcome to the blockchain</div> 
                <br/>
                <Blocks />
            </div>
        );
    }
}

export default App;