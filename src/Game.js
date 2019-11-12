import React from 'react';
import Chess from 'react-chess';

import './Game.css';

// const PIECES = {
//         'WK': '♔',
//         'WQ': '♕',
//         'WR': '♖',
//         'WB': '♗',
//         'WN': '♘',
//         'WP': '♙',
//         'BK': '♚',
//         'BQ': '♛',
//         'BR': '♜',
//         'BB': '♝',
//         'BN': '♞',
//         'BP': '♟'
//     }
//
// const NEW_BOARD = [
//         ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
//         ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
//         ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
//         ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
//         ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
//         ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
//         ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
//         ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR']
//     ]


class Game extends React.Component{
   constructor(props){
     super(props)

     this.state = {pieces: Chess.getDefaultLineup()}
     this.handleMovePiece = this.handleMovePiece.bind(this)
   }

   handleMovePiece(piece, fromSquare, toSquare) {
     console.log("piece: " + piece.name + " " + fromSquare + " -> " + toSquare)
   }

   render(){
     const {pieces} = this.state
     return(
       <div className='wrapper game card blue-grey darken-1 z-depth-5'>
          <Chess pieces={pieces} onMovePiece={this.handleMovePiece}/>
       </div>
     )
   }
}

export default Game;
