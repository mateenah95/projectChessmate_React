import React from 'react';

import Lobby from './Lobby';
import NewGamesBar from './NewGamesBar';

import './GamesBar.css';

class GamesBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Lobby lobby={this.props.lobby}/>
                <NewGamesBar />    
            </div>
        )
    }
}

export default GamesBar;