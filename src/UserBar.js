import React from 'react';

import ProfilePic from './imgs/profile_pic.jpg';

import './UserBar.css';

class UserBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='wrapper card blue-grey darken-1'>
                <img src={this.props.user ? this.props.user.displayPicture : ProfilePic} className='profilePic' height='200em' width='200em' />
                <h3 className='special-head'>{this.props.user ? this.props.user.username : 'username'}</h3>
                <div className='row'>
                    <div className='col s3'></div>
                    <div className='col s3'>
                        <h3>Score</h3>
                        <h4>{this.props.user ? this.props.user.score : '0'} pts</h4>
                    </div>
                    <div className='col s3'>
                        <h3>Rank</h3>
                        <h4># {this.props.user ? this.props.user.rank : '0'}</h4>
                    </div>
                    <div className='col s3'></div>
                </div>
                <div className='row'>
                    <div className='col s6'>
                        <h2>Solo</h2>
                        <h4 className='stat'>Wins</h4>
                        <h4 className='stat'>{this.props.user ? this.props.user.solo.win : '0'}</h4>
                        <h4 className='stat'>Loss</h4>
                        <h4 className='stat'>{this.props.user ? this.props.user.solo.loss : '0'}</h4>
                        <h4 className='stat'>Draw</h4>
                        <h4 className='stat'>{this.props.user ? this.props.user.solo.draw : '0'}</h4>
                    </div>
                    <div className='col s6'>
                        <h2>Multi</h2>
                        <h4 className='stat'>Wins</h4>
                        <h4 className='stat'>{this.props.user ? this.props.user.multi.win : '0'}</h4>
                        <h4 className='stat'>Loss</h4>
                        <h4 className='stat'>{this.props.user ? this.props.user.multi.loss : '0'}</h4>
                        <h4 className='stat'>Draw</h4>
                        <h4 className='stat'>{this.props.user ? this.props.user.multi.draw : '0'}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserBar;