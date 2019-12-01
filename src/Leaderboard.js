import React, { Component } from 'react'
import Dropdown from 'react-dropdown';

import './Leaderboard.css';
import UserBar from "./UserBar";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.multiplayer_data = {
            users: [
                { rank: 1, username: 'Bob', wins: 10, losses: 0, score: 100 },
                { rank: 2, username: 'Jake', wins: 4, losses: 2, score: 30 },
                { rank: 3, username: 'Bill', wins: 5, losses: 5, score: 25 },
                { rank: 4, username: 'Mike', wins: 1, losses: 2, score: 0 },
                { rank: 5, username: 'Philip', wins: 0, losses: 3, score: -15 }
            ]
        };
        this.singleplayer_data = {
            users: [
                { rank: 1, username: 'Sandra', wins: 100, losses: 0, score: 1000 },
                { rank: 2, username: 'Alexis', wins: 45, losses: 50, score: 200 },
                { rank: 3, username: 'Taylor', wins: 40, losses: 60, score: 100 },
                { rank: 4, username: 'Andrea', wins: 12, losses: 40, score: -80 },
                { rank: 5, username: 'Leslie', wins: 10, losses: 50, score: -150 }
            ]
        };

        this.state = {
            multiplayer: {
                usernameFilter: '',
                minRank: 0,
                maxRank: 100,
                minScore: 0,
                maxScore: 100,
                sortBy: 'rank'
            },
            singleplayer: {
                usernameFilter: '',
                minRank: 0,
                maxRank: 100,
                minScore: 0,
                maxScore: 100,
                sortBy: ''
            },
            sort_options: [{ value: 'rank', label: 'Rank' }, { value: 'username', label: 'Username' }, { value: 'score', label: 'Score' }],

        }

        this.sliderHandler = this.sliderHandler.bind(this);
        this.usernameHandler = this.usernameHandler.bind(this);
        this.multiplayerSortByHandler = this.multiplayerSortByHandler.bind(this);
    }

    renderTableData(mode) {
        if (mode === "multi") {
            return this.multiplayer_data.users.map((data) => {
                const { rank, username, wins, losses, score } = data;
                return (
                    <tr key={username}>
                        <td>{rank}</td>
                        <td>{username}</td>
                        <td>{wins}</td>
                        <td>{losses}</td>
                        <td>{score}</td>
                    </tr>
                )
            })
        }
        else {
            return this.singleplayer_data.users.map((data) => {
                const { rank, username, wins, losses, score } = data;
                return (
                    <tr key={username}>
                        <td>{rank}</td>
                        <td>{username}</td>
                        <td>{wins}</td>
                        <td>{losses}</td>
                        <td>{score}</td>
                    </tr>
                )
            })
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.singleplayer_data.users[0]);
        return header.map((key) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    sliderHandler(e) {
        let newValue = parseInt(e.target.value);

        switch (e.target.id) {
            case 'multiplayer-min-rank':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: newValue,
                        maxRank: prevState.multiplayer.maxRank,
                        minScore: prevState.multiplayer.minScore,
                        maxScore: prevState.multiplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;

            case 'multiplayer-max-rank':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: prevState.multiplayer.minRank,
                        maxRank: newValue,
                        minScore: prevState.multiplayer.minScore,
                        maxScore: prevState.multiplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
            case 'multiplayer-min-score':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: prevState.multiplayer.minRank,
                        maxRank: prevState.multiplayer.maxRank,
                        minScore: newValue,
                        maxScore: prevState.multiplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
            case 'multiplayer-max-score':
                this.setState(prevState => ({
                    multiplayer: {
                        usernameFilter: prevState.multiplayer.usernameFilter,
                        minRank: prevState.multiplayer.minRank,
                        maxRank: prevState.multiplayer.maxRank,
                        minScore: prevState.multiplayer.minScore,
                        maxScore: newValue,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
            case 'singleplayer-min-rank':
                this.setState(prevState => ({
                    singleplayer: {
                        usernameFilter: prevState.singleplayer.usernameFilter,
                        minRank: newValue,
                        maxRank: prevState.singleplayer.maxRank,
                        minScore: prevState.singleplayer.minScore,
                        maxScore: prevState.singleplayer.maxScore,
                        sortBy: prevState.singleplayer.sortBy
                    }
                }));
                break;
            case 'singleplayer-max-rank':
                this.setState(prevState => ({
                    singleplayer: {
                        usernameFilter: prevState.singleplayer.usernameFilter,
                        minRank: prevState.singleplayer.minRank,
                        maxRank: newValue,
                        minScore: prevState.singleplayer.minScore,
                        maxScore: prevState.singleplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
            case 'singleplayer-min-score':
                this.setState(prevState => ({
                    singleplayer: {
                        usernameFilter: prevState.singleplayer.usernameFilter,
                        minRank: prevState.singleplayer.minRank,
                        maxRank: prevState.multiplayer.maxRank,
                        minScore: newValue,
                        maxScore: prevState.singleplayer.maxScore,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
            case 'singleplayer-max-score':
                this.setState(prevState => ({
                    singleplayer: {
                        usernameFilter: prevState.singleplayer.usernameFilter,
                        minRank: prevState.singleplayer.minRank,
                        maxRank: prevState.singleplayer.maxRank,
                        minScore: prevState.singleplayer.minScore,
                        maxScore: newValue,
                        sortBy: prevState.multiplayer.sortBy
                    }
                }));
                break;
        }

        setTimeout(() => console.log(this.state.singleplayer), 200);
    }

    usernameHandler(e) {
        let newValue = e.target.value;

        if (e.target.id === 'multiplayer-username-filter') {
            this.setState(prevState => ({
                multiplayer: {
                    minRank: prevState.multiplayer.minRank,
                    maxRank: prevState.multiplayer.maxRank,
                    minScore: prevState.multiplayer.minScore,
                    maxScore: prevState.multiplayer.maxScore,
                    usernameFilter: newValue
                }
            }));
        }

        if (e.target.id === 'singleplayer-username-filter') {
            this.setState(prevState => ({
                singleplayer: {
                    minRank: prevState.singleplayer.minRank,
                    maxRank: prevState.singleplayer.maxRank,
                    minScore: prevState.singleplayer.minScore,
                    maxScore: prevState.singleplayer.maxScore,
                    usernameFilter: newValue
                }
            }))
        }

        setTimeout(() => console.log(this.state), 200);
    }

    multiplayerSortByHandler(e) {
        this.setState(prevState => ({
            multiplayer: {
                usernameFilter: prevState.multiplayer.usernameFilter,
                minRank: prevState.multiplayer.minRank,
                maxRank: prevState.multiplayer.maxRank,
                minScore: prevState.multiplayer.minScore,
                maxScore: prevState.multiplayer.maxScore,
                sortBy: e.value
            }
        }));
        setTimeout(() => { console.log(this.state) }, 100);
    }


    render() {
        return (
            <div>
                <br />
                <div className="row">
                    <div className='col s6 padded'>
                        <div className="padded wrapper card blue-grey darken-1 z-depth-5" id="multiplayer_container">
                            <h3 id='leaderboard_title'> Multi-player </h3>
                            <h5>Timed</h5>
                            <br />
                            <table id='leaderboard_table' className='striped'>
                                <tbody>
                                    <tr>{this.renderTableHeader()}</tr>
                                    {this.renderTableData("multi")}
                                </tbody>
                            </table>
                            <div className='filter-wrapper center leaderboard-text-filter'>
                                <div className='row'>
                                    <div className='col s6'>
                                        <h4>Filter</h4>
                                        <input id='multiplayer-username-filter' type='text' className='center white-text' value={this.state.multiplayer.usernameFilter} placeholder='Filter by username' onChange={this.usernameHandler}></input>
                                    </div>
                                    <div className='col s6'>
                                        <h4>Sort By</h4>
                                        <Dropdown options={this.state.sort_options} value={this.state.multiplayer.sortBy} onChange={this.multiplayerSortByHandler} />

                                    </div>
                                </div>
                                <br />
                                <h4>Rank Range</h4>
                                <div className="row">
                                    <div className='col s6'>
                                        <h6>Min Rank</h6>
                                        <div id='min-rank'>{this.state.multiplayer.minRank}</div>
                                        <div tooltip={this.state.multiplayer.minRank}>
                                            <input type="range" min="1" max="100" value={this.state.multiplayer.minRank} className="slider" id="multiplayer-min-rank" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                    <div className='col s6'>
                                        <h6>Max Rank</h6>
                                        <div id='max-rank'>{this.state.multiplayer.maxRank}</div>
                                        <div tooltip={this.state.multiplayer.maxRank}>
                                            <input type="range" min="1" max="100" value={this.state.multiplayer.maxRank} className="slider" id="multiplayer-max-rank" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <h4>Score Range</h4>
                                <div className="row">
                                    <div className='col s6'>
                                        <h6>Min Score</h6>
                                        <div id='min-rank'>{this.state.multiplayer.minScore}</div>
                                        <div tooltip={this.state.multiplayer.minScore}>
                                            <input type="range" min="1" max="100" value={this.state.multiplayer.minScore} className="slider" id="multiplayer-min-score" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                    <div className='col s6'>
                                        <h6>Max Score</h6>
                                        <div id='max-rank'>{this.state.multiplayer.maxScore}</div>
                                        <div tooltip={this.state.multiplayer.maxScore}>
                                            <input type="range" min="1" max="100" value={this.state.multiplayer.maxScore} className="slider" id="multiplayer-max-score" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className='col s6 padded'>
                        <div className="padded wrapper card blue-grey darken-1 z-depth-5" id="singleplayer_container">
                            <h3 id='leaderboard_title'> Single player </h3>
                            <h5 id='active_engine'> Engine: Stockfish 5</h5>
                            <br />
                            <table id='leaderboard_table' className='striped'>
                                <tbody>
                                    <tr>{this.renderTableHeader()}</tr>
                                    {this.renderTableData("single")}
                                </tbody>
                            </table>
                            <div className='filter-wrapper center leaderboard-text-filter'>
                                <div className='row'>
                                    <div className='col s6'>
                                        <h4>Filter</h4>
                                        <input id='singleplayer-username-filter' type='text' className='center white-text' value={this.state.singleplayer.usernameFilter} placeholder='Filter by username' onChange={this.usernameHandler}></input>
                                    </div>
                                    <div className='col s6'>
                                        <h4>Sort By</h4>
                                    </div>
                                </div>
                                <br />
                                <h4>Rank Range</h4>
                                <div className="row">
                                    <div className='col s6'>
                                        <h6>Min Rank</h6>
                                        <div>{this.state.singleplayer.minRank}</div>
                                        <div tooltip={this.state.singleplayer.minRank}>
                                            <input type="range" min="1" max="100" value={this.state.singleplayer.minRank} className="slider" id="singleplayer-min-rank" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                    <div className='col s6'>
                                        <h6>Max Rank</h6>
                                        <div>{this.state.singleplayer.maxRank}</div>
                                        <div tooltip={this.state.singleplayer.maxRank}>
                                            <input type="range" min="1" max="100" value={this.state.singleplayer.maxRank} className="slider" id="singleplayer-max-rank" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <h4>Score Range</h4>
                                <div className="row">
                                    <div className='col s6'>
                                        <h6>Min Score</h6>
                                        <div>{this.state.singleplayer.minScore}</div>
                                        <div tooltip={this.state.singleplayer.minScore}>
                                            <input type="range" min="1" max="100" value={this.state.singleplayer.minScore} className="slider" id="singleplayer-min-score" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                    <div className='col s6'>
                                        <h6>Max Score</h6>
                                        <div>{this.state.singleplayer.maxScore}</div>
                                        <div tooltip={this.state.singleplayer.maxScore}>
                                            <input type="range" min="1" max="100" value={this.state.singleplayer.maxScore} className="slider" id="singleplayer-max-score" onChange={this.sliderHandler} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <br />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default Leaderboard;