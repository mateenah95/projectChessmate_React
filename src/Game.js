import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
import Chessboard from "chessboardjsx";
import Axios from 'axios';
import GameTime from "./GameTime"
import GameMoves from "./GameMoves"

const io = require('socket.io-client');
const socket = io.connect('http://localhost:5001/');

const game_time = new GameTime();
const game_moves = new GameMoves();

let side_ = '';
let orientation = 'white';

let move_ = '';
let position = 'start';
let game_id = "";
const time = 5 * 60;
const testing = true;

class Game extends Component {
    static propTypes = { children: PropTypes.func };
    state = {
        fen: "start",
        dropSquareStyle: {},
        squareStyles: {},
        pieceSquare: "",
        square: "",
        history: []
    };

    updateBoard = () => {
        this.setState({
            fen: position,
            history: this.game.history({ verbose: true }),
            pieceSquare: ""
        });

        this.game.move(move_);
    };

    componentDidMount() {
        Axios.post('http://localhost:5000/game/create', {
            username: "Bob",
            color: "w"
        }).then(response => {
            game_id = response.data._id
            console.log(game_id)
            console.log(response)
        }).catch(error => {
            console.error(error)
        });
        game_time.init_clocks(time);
        game_time.start_w();
        this.game = new Chess();
        socket.on('fen', function (fen) {
            position = fen;
            this.updateBoard();
        }.bind(this));
        socket.on('move', function (move) {
            move_ = move;
            this.updateBoard();
        }.bind(this));
        socket.on('side', function (side) {
            console.log(side);
            side_ = side;
            if (side_ === 'w') {
                orientation = 'white';
            } else {
                orientation = 'black';
            }
            this.updateBoard();
            game_time.init_clocks(time);
            game_time.start_w();
        }.bind(this));
    }


    // keep clicked square style and remove hint squares
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
            squareStyles: squareStyling({ pieceSquare, history })
        }));
    };

    // show possible moves
    highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...squareStyling({
                        history: this.state.history,
                        pieceSquare: this.state.pieceSquare
                    }),
                    ...a,
                    ...{
                        [c]: {
                            background:
                                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                            borderRadius: "50%"
                        }
                    }
                };
            },
            {}
        );

        this.setState(({ squareStyles }) => ({
            squareStyles: { ...squareStyles, ...highlightStyles }
        }));
    };

    onDrop = ({ sourceSquare, targetSquare }) => {
        if (this.game.turn() !== side_)
            return;
        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;
        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: squareStyling({ pieceSquare, history })
        }));
        socket.emit('move', move);
        socket.emit('fen', this.game.fen());

        const history = this.state.history;
        history.push(move);
        game_moves.updateMoves(history);
        if (this.game.turn() === 'b') {
            game_time.start_b();
            game_time.stop_w();
        } else if (this.game.turn() === 'w') {
            game_time.start_w();
            game_time.stop_b();
        }

        if (this.game.in_draw() || this.game.in_stalemate()) {
            console.log("draw")
        }
        else if (this.game.game_over() && this.game.turn() === 'b') {
            console.log("white won");
        }
        else if (this.game.game_over() && this.game.turn() === 'w') {
            console.log("white won");
        }
    };

    onMouseOverSquare = square => {

    };

    onDragOverSquare = square => { };

    onSquareClick = square => {
        if (this.game.turn() !== side_ && !testing)
            return;
        let moves = this.game.moves({
            square: square,
            verbose: true
        });
        let squaresToHighlight = [];
        for (let i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }


        this.setState(({ history }) => ({
            squareStyles: squareStyling({ pieceSquare: square, history }),
            pieceSquare: square
        }));

        let move = this.game.move({
            from: this.state.pieceSquare,
            to: square,
            promotion: "q" // always promote to a queen for example simplicity
        });

        if (moves.length !== 0)
            this.highlightSquare(square, squaresToHighlight);
        // illegal move
        if (move === null) return;

        this.setState({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            pieceSquare: ""
        });


        socket.emit('move', move);
        socket.emit('fen', this.game.fen());

        this.removeHighlightSquare();
        const history = this.state.history;
        history.push(move);
        game_moves.updateMoves(history);
        if (this.game.turn() === 'b') {
            game_time.start_b();
            game_time.stop_w();
        } else if (this.game.turn() === 'w') {
            game_time.start_w();
            game_time.stop_b();
        }

        if (this.game.in_draw() || this.game.in_stalemate()) {
            console.log("draw")
        }
        else if (this.game.game_over() && this.game.turn() === 'b') {
            console.log("white won");
        }
        else if (this.game.game_over() && this.game.turn() === 'w') {
            console.log("white won");
        }

    };

    onSquareRightClick = square => {
        // Axios.post('http://localhost:5000/game/join/' + game_id, {
        //     username: "Jeb"
        // }).then(response => {
        //     console.log(game_id);
        //     console.log(response)
        // }).catch(error => {
        //     console.error(error)
        // });
        game_time.start_w();

    };


    render() {
        const { fen, dropSquareStyle, squareStyles } = this.state;
        return this.props.children({
            squareStyles,
            position: fen,
            onMouseOverSquare: this.onMouseOverSquare,
            onMouseOutSquare: this.onMouseOutSquare,
            onDrop: this.onDrop,
            dropSquareStyle,
            onDragOverSquare: this.onDragOverSquare,
            onSquareClick: this.onSquareClick,
            onSquareRightClick: this.onSquareRightClick
        });
    }
}

export default function WithMoveValidation() {
    return (
        <div>
            <Game>
                {({
                    position,
                    onDrop,
                    onMouseOverSquare,
                    onMouseOutSquare,
                    squareStyles,
                    dropSquareStyle,
                    onDragOverSquare,
                    onSquareClick,
                    onSquareRightClick
                }) => (
                        <Chessboard
                            id="humanVsHuman"
                            width={600}
                            orientation={orientation}
                            position={position}
                            onDrop={onDrop}
                            onMouseOverSquare={onMouseOverSquare}
                            onMouseOutSquare={onMouseOutSquare}
                            boardStyle={{
                                borderRadius: "5px",
                                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                            }}
                            squareStyles={squareStyles}
                            dropSquareStyle={dropSquareStyle}
                            onDragOverSquare={onDragOverSquare}
                            onSquareClick={onSquareClick}
                            onSquareRightClick={onSquareRightClick}
                        />
                    )}
            </Game>
        </div>
    );
}

const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        ...(history.length && {
            [sourceSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        }),
        ...(history.length && {
            [targetSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        })
    };
};