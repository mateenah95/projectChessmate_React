import React from 'react';

import UserBar from './UserBar';
import GameBar from './GamesBar';

import './LobbyPage.css';

class LobbyPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col s6'>
                        <UserBar user={this.props.user} />
                    </div>
                    	
                    <div className='col s6'>
                        <GameBar lobby={this.props.lobby} />
                    </div>
                </div>
            </div>
        )
    }
}

export default LobbyPage;