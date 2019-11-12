import React, { Component } from 'react'

import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import './Admin.css';



class Admin extends Component {
    constructor(props) {
        super(props);
        this.data = {
            users: [
                {username: 'bob', wins: 10, losses: 0, win_rate: '100%', banned: false},
                {username: 'bob2', wins: 5, losses: 5, win_rate: '50%', banned: false},
                {username: 'bob3', wins: 0, losses: 20, win_rate: '0%', banned: true}
            ]
        };
        this.difficulty = ["Stockfish 1", "Stockfish 2", "Stockfish 3", "Stockfish 4", "Stockfish 5", "Stockfish 6",
            "Stockfish 7", "Stockfish 8"];
        this.active_difficulty = "Stockfish 5";
    }

    renderTableData() {
        return this.data.users.map((data) => {
            const {username, wins, losses, win_rate ,banned} = data;
            let banned_arr = [];
            if (banned) {
                banned_arr.push("Un-ban user");
            } else {
                banned_arr.push("Ban user");
            }
            return (
                <tr>
                    <td>{username}</td>
                    <td>{wins}</td>
                    <td>{losses}</td>
                    <td>{win_rate}</td>
                    <td> <a className="waves-effect waves-light btn">{banned_arr}</a> </td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.data.users[0]);
        return header.map((key) => {
            return <th>{key.toUpperCase()}</th>
        })
    }



    render() {
        return (
            <div>
                <br />
                <div className="row">
                    <div className='col s1'></div>
                    <div className="col s3 wrapper card blue-grey darken-1 z-depth-5 admin_container">
                        <table id='stats_table' className='striped'>
                            <h4> Site Statistics </h4>
                            <br />
                            <tbody>
                            <tr>
                                <td className='center'>Total users: 69</td>
                            </tr>
                            <tr>
                                <td className='center'>Online users: 6</td>
                            </tr>
                            <tr>
                                <td className='center'>Active games: 9</td>
                            </tr>
                            <tr>
                                <td className='center'>Total games played: 6969</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col s2'></div>
                    <div className="col s5 wrapper card blue-grey darken-1 z-depth-5 admin_container">
                        <h4> Manage Users </h4>
                        <br />
                        <div className="input-field col s12">
                            <input id="icon_prefix" type="text" className="validate center" />
                                <label htmlFor="icon_prefix">Search username</label>
                        </div>

                        <table id='users_table' className='striped'>
                            <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="row">
                    <div className='col s6'></div>
                    <div className="col s5 wrapper card blue-grey darken-1 z-depth-5 admin_container">
                        <table id='settings_table' className='striped'>
                            <h4> Game settings </h4>
                            <br />
                            <tbody>
                            <tr>
                                <td>Single player difficultly:
                                    <Dropdown options={this.difficulty} value={this.active_difficulty}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <br />
                        <a className="waves-effect waves-light btn save_difficulty">Save</a>
                        <br />
                    </div>
                </div>
            </div>

        )
    }
}

export default Admin;