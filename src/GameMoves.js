import React from 'react';

import './GameMoves.css';

class GameInfo extends React.Component{
   constructor(props){
     super(props)
   }

   render(){
     return(
         <div className='wrapper gamemoves card blue-grey darken-1 z-depth-5'>
             <h3>Moves</h3>
             <table className='striped'>
                <thead>
                    <tr>
                      <th className='filter-text'>White {this.props.user ? "(" + this.props.user.username + ")" : ""}</th>
                      <th className='filter-text'>Black (Computer)</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                      <td className='filter-text'>♜c1</td>
                      <td className='filter-text'>♗d5</td>
                  </tr>
                  <tr>
                      <td className='filter-text'>♛f4</td>
                      <td className='filter-text'>♘f4</td>
                  </tr>
                  <tr>
                      <td className='filter-text'>♜c1</td>
                      <td className='filter-text'>♖d5</td>
                  </tr>
                  <tr>
                      <td className='filter-text'>♜c1</td>
                      <td className='filter-text'>♗d5</td>
                  </tr>
                  <tr>
                      <td className='filter-text'>♜c1</td>
                      <td className='filter-text'>♗d5</td>
                  </tr>
                  <tr>
                      <td className='filter-text'>♜c1</td>
                      <td className='filter-text'>♗d5</td>
                  </tr>
                </tbody>
             </table>
         </div>
     )
   }
}

export default GameInfo;
