import React from 'react';

import UserBar from './UserBar';

import './Profile.css';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: ''
        }
        this.updateUsername = this.updateUsername.bind(this);
    }

    updateUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    render(){
        return (
            <div>
                <br />
                <div id='Main' class='row'>
                    <div id='ProfileInfo' class='col s5'>
                        <UserBar user={this.props.user} />
                    </div>
                    <div id='GameStuff' class='col s6'>
                        <div class='row wrapper card blue-grey darken-1'>
                            <button id='playButton' class="waves-effect waves-light btn"> Request to Play</button>
                        </div>
                        <Badges badges={this.props.user.badges}/>
                        <FriendsList friends={this.props.user.friends}/>
                        <MatchHistory matches={this.props.user.matchHistory}/> 
                    </div>
                </div>
                <div id='ChangeProfileInfo' class='row wrapper card blue-grey darken-1'>
                    <h3>Update Profile Info</h3>
                    <input type="text" id="username" onChange={this.updateUsername} placeholder="Enter new username here" value={this.state.username}/>
                    <a onClick={() => this.props.changeName(this.state.username)} className="waves-effect waves-light btn inline space-around">Change Name</a>
                    <a onClick={this.props.resetSolo} className="waves-effect waves-light btn inline space-around">Reset Solo Stats</a>
                    <a onClick={this.props.resetMulti} className="waves-effect waves-light btn inline space-around">Reset Multi Stats</a>
                    <a onClick={this.props.hideShowHist} class="waves-effect waves-light btn space-around">Hide <span class='redText'>Match</span> History - {this.props.user.matchHistoryView ? 'on' : 'off'}</a>
                </div>
                <br />
            </div>
        )
    }
}

class Badges extends React.Component {
    render() {
        const badges = this.props
        return(
            <div class='row wrapper card blue-grey darken-1'>
            <h2> Badges </h2>
            {badges.badges.map((badge) => {
                return(
                    <img src={badge} class='badge'/>
                )
            })}
            </div>
        )
    }
}

class FriendsList extends React.Component {
    render() {
        const friends = this.props
        return(
            <div class='row wrapper card blue-grey darken-1'>
                <h3>Friends List</h3>
                <ul id='friendList'>
                    {friends.friends.map((friend) => {
                        return(
                            <li key={friend.uniqueId}>
                                <a href="#"><span class='redText'>{friend.name+" "}</span></a>
                                Games: {friend.gamesPlayed+" "}
                                Won: {friend.gamesPlayed != 0 ? friend.won+" " : " - "}
                                Lost: {friend.gamesPlayed != 0 ? friend.lost+" " : " - "}
                                Drawn: {friend.gamesPlayed != 0 ? friend.draw+" " : " - "}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

class MatchHistory extends React.Component {
    render() {
        const matches = this.props
        return(
            <div id='matchHistory' class='row wrapper card blue-grey darken-1'> 
                <table>
                    <thead>
                        <tr>
                            <th>Game #</th>
                            <th>Played Against</th>
                            <th>Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.matches.map((match) => {
                            return(
                                <tr>
                                    <td>{match.gameNum}</td>
                                    <td><em>{match.name}</em></td>
                                    <td>{match.result}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Profile;