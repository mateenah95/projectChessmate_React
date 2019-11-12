import React, { Component } from 'react'

import './Leaderboard.css';
import UserBar from "./UserBar";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.multiplayer_data = {
            users: [
                {rank: 1, username: 'Bob', wins: 10, losses: 0, score: 100},
                {rank: 2, username: 'Jake', wins: 4, losses: 2, score: 30},
                {rank: 3, username: 'Bill', wins: 5, losses: 5, score: 25},
                {rank: 4, username: 'Mike', wins: 1, losses: 2, score: 0},
                {rank: 5, username: 'Philip', wins: 0, losses: 3, score: -15}
            ]
        };
        this.singleplayer_data = {
            users: [
                {rank: 1, username: 'Sandra', wins: 100, losses: 0, score: 1000},
                {rank: 2, username: 'Alexis', wins: 45, losses: 50, score: 200},
                {rank: 3, username: 'Taylor', wins: 40, losses: 60, score: 100},
                {rank: 4, username: 'Andrea', wins: 12, losses: 40, score: -80},
                {rank: 5, username: 'Leslie', wins: 10, losses: 50, score: -150}
            ]
        };
    }

    renderTableData(mode) {
        if (mode === "multi"){
            return this.multiplayer_data.users.map((data) => {
                const {rank, username, wins, losses, score} = data;
                return (
                    <tr>
                        <td>{rank}</td>
                        <td>{username}</td>
                        <td>{wins}</td>
                        <td>{losses}</td>
                        <td>{score}</td>
                    </tr>
                )
            })
        }
        else{
            return this.singleplayer_data.users.map((data) => {
                const {rank, username, wins, losses, score} = data;
                return (
                    <tr>
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
            return <th>{key.toUpperCase()}</th>
        })
    }

    render() {
        return (
            <div>
                <br />
                <div className="row">
                    <div className="col s6 wrapper card blue-grey darken-1 z-depth-5" id="multiplayer_container">
                        <h3 id='leaderboard_title'> Multi-player </h3>
                        <h5>Timed</h5>
                        <br />
                        <table id='leaderboard_table' className='striped'>
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData("multi")}
                            </tbody>
                        </table>
                    </div>
                    <div className="col s6 wrapper card blue-grey darken-1 z-depth-5" id="singleplayer_container">
                        <h3 id='leaderboard_title'> Single player </h3>
                        <h5 id='active_engine'> Engine: Stockfish 5</h5>
                        <br />
                        <table id='leaderboard_table' className='striped'>
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData("single")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Leaderboard;