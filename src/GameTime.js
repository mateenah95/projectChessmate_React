import React from 'react';

import './GameTime.css';

class GameInfo extends React.Component{
   constructor(props){
     super(props)
     
   }

   render(){
     return(
         <div className='wrapper gametime card blue-grey darken-1 z-depth-5'>
             <h3>Time</h3>
             <table className='striped'>
                 <thead>
                     <tr>
                         <th className='filter-text'>White {this.props.user ? "(" + this.props.user.username + ")" : ""}</th>
                         <th className='filter-text'>Black (Computer)</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr>
                         <td className='filter-text'>1:01</td>
                         <td className='filter-text'>2:32</td>
                     </tr>
                 </tbody>
             </table>
         </div>
     )
   }
}

export default GameInfo;
