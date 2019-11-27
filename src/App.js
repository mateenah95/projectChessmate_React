import React from 'react';
import M from 'materialize-css';
import Axios from 'axios';

import Router from './Router';

import GoldStar from './imgs/gold_star.png';
import Trophy from './imgs/trophy.png';
import Crown from './imgs/crown.png';
// import { REFUSED } from 'dns';

const TEST_USER = {
    isAdmin: false,
    username: 'standard_user',
    display_pic: 'http://google.com',
    score: 3200,
    rank: 4,
    solo: {
        win: 3,
        loss: 7,
        draw: 2
    },
    multi: {
        win: 9,
        loss: 4,
        draw: 6
    },
    uniqueId: 7,
    matchHistoryView: true, /*will match history be shown to others when profile is viewed*/
    badges: [GoldStar, Trophy, Crown], /*badges for playing this player has*/
    friends: [
        { name: "Tom", id: "1", gamesPlayed: 2, won: 1, lost: 1, draw: 0 },
        { name: "Bob", id: "3", gamesPlayed: 4, won: 1, lost: 2, draw: 1 },
        { name: "Jay", id: "2", gamesPlayed: 0 },
        { name: "Ray", id: "8", gamesPlayed: 0 },
        { name: "Max", id: "43", gamesPlayed: 0 }
    ],
    matchHistory: [
        { gameNum: 34, name: 'mateenah95', result: 'Draw' },
        { gameNum: 36, name: 'johndoe99', result: 'Win' },
        { gameNum: 37, name: 'billgates2010', result: 'Win' },
        { gameNum: 28, name: 'markzuckerberg69', result: 'Loss' }
    ]
};

const TEST_ADMIN = {
    isAdmin: true,
    username: 'standard_admin',
    display_pic: 'http://google.com',
    score: 3200,
    rank: 4,
    solo: {
        win: 3,
        loss: 7,
        draw: 2
    },
    multi: {
        win: 9,
        loss: 4,
        draw: 6
    },
    uniqueId: 7,
    matchHistoryView: true, /*will match history be shown to others when profile is viewed*/
    badges: [GoldStar, Trophy, Crown], /*badges for playing this player has*/
    friends: [
        { name: "Tom", id: "1", gamesPlayed: 2, won: 1, lost: 1, draw: 0 },
        { name: "Bob", id: "3", gamesPlayed: 4, won: 1, lost: 2, draw: 1 },
        { name: "Jay", id: "2", gamesPlayed: 0 },
        { name: "Ray", id: "8", gamesPlayed: 0 },
        { name: "Max", id: "43", gamesPlayed: 0 }
    ],
    matchHistory: [
        { gameNum: 34, name: 'mateenah95', result: 'Draw' },
        { gameNum: 36, name: 'johndoe99', result: 'Win' },
        { gameNum: 37, name: 'billgates2010', result: 'Win' },
        { gameNum: 28, name: 'markzuckerberg69', result: 'Loss' }
    ]
};

const TEST_LOBBY = [
    { id: 234, host: 'mateenah95', availability: 1 },
    { id: 235, host: 'billgates99', availability: 0 },
    { id: 236, host: 'elonmusk69', availability: 1 },
    { id: 237, host: 'eltonjohn47', availability: 0 },
    { id: 238, host: 'bobbyshremure21', availability: 1 },
    { id: 239, host: 'louisfonsi73', availability: 0 }
];


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            lobby: [
                { id: 0, host: 'ChessMate', availability: 0 },
                { id: 1, host: 'ChessMate', availability: 0 },
                { id: 2, host: 'ChessMate', availability: 0 },
                { id: 3, host: 'ChessMate', availability: 0 },
                { id: 4, host: 'ChessMate', availability: 0 },
                { id: 5, host: 'ChessMate', availability: 0 }
            ]
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.hideShowHist = this.hideShowHist.bind(this);
        this.resetMulti = this.resetMulti.bind(this);
        this.resetSolo = this.resetSolo.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    login(admn) {
        this.setState(state => ({ user: admn, lobby: TEST_LOBBY }))
        //if (admn) {
        //    this.setState(state => ({ user: TEST_ADMIN, lobby: TEST_LOBBY }))
        //} else {
        //    this.setState(state => ({ user: TEST_USER, lobby: TEST_LOBBY }))
        //}
    }

    logout() {
        M.toast({ html: 'Logout Success!' })
        this.setState(state => ({ user: null }))
    }

    hideShowHist() {
        const use = this.state.user;
        use.matchHistoryView = !this.state.user.matchHistoryView;
        this.setState(state => ({
            user: use, lobby: state.lobby
        }));
    }

    changeName(newName) {
        if (newName) {
            Axios.patch('http://localhost:5000/changeName', { // patch not allowed for some reason 
                username: newName
            }).then(response => {
                const use = this.state.user;
                use.username = newName;
                this.setState(state => ({
                    user: use, lobby: state.lobby
                }));
            }).catch(error => {
                alert("no good");
            })
        }
    }

    resetSolo() {
        const use = this.state.user;
        use.solo = { win: 0, loss: 0, draw: 0 }
        this.setState(state => ({
            user: use, lobby: state.lobby
        }));
    }

    resetMulti() {
        const use = this.state.user;
        use.multi = { win: 0, loss: 0, draw: 0 }
        this.setState(state => ({
            user: use, lobby: state.lobby
        }));
    }

    render() {
        return (
            <Router user={this.state.user} lobby={this.state.lobby}
                login={this.login} logout={this.logout} hideShowHist={this.hideShowHist}
                resetMulti={this.resetMulti} resetSolo={this.resetSolo} changeName={this.changeName}
            />
        )
    }
}

export default App;
