import React from 'react';

import './GameMoves.css';

class GameInfo extends React.Component{
   constructor(props){
       super(props)
       this.state = {
           moves: <tbody/>
       };
       this.updateMoves = this.updateMoves.bind(this);

   }

    updateMoves(moves){

       let table = "";
       for (let i = 0; i < moves.length; i ++){
           if (moves[i].color === 'w') {
               table += "<tr>";
               table += "<td className='filter-text'>";
               table += moves[i].san;
               table += "</td>";
           } else if (moves[i].color === 'b'){
               table += "<td className='filter-text'>";
               table += moves[i].san;
               table += "</td>";
               table += "</tr>";
           }
       }
       if (moves.length > 0 && moves[moves.length - 1].color === 'w') {
           table += "</tr>";
       }
       document.getElementById("moves_list").innerHTML = table;

   }

   render(){
     return(
         <div className='wrapper gamemoves card blue-grey darken-1 z-depth-5'>
             <h3>Moves</h3>
             <table className='striped'>
                <thead>
                    <tr>
                      <th className='filter-text'>White {this.props.user ? "(" + this.props.user.username + ")" : ""}</th>
                      <th className='filter-text'>Black </th>
                    </tr>
                </thead>
                <tbody id='moves_list'>
                </tbody>
             </table>
         </div>
     )
   }
}

export default GameInfo;
