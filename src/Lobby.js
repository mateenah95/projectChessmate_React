import React from 'react';
import Dropdown from 'react-dropdown';

import './Lobby.css';
import 'react-dropdown/style.css'
import { exportDefaultSpecifier } from '@babel/types';

class Lobby extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sort_options: [{value: 'id', label: 'Id'}, {value: 'host', label: 'Host'}, {value: 'availability', label: 'Availability'}],
            show_only_available: false,
            host_filter: '',
            sort_by: 'id',
            games_to_show: [...this.props.lobby]
        }

        this.toggleAvailabilityFilter = this.toggleAvailabilityFilter.bind(this);
        this.runFilters = this.runFilters.bind(this);
        this.updateHostFilter = this.updateHostFilter.bind(this);
        this.updateSortOption = this.updateSortOption.bind(this);
    }

    updateHostFilter(e){
        this.setState({host_filter: e.target.value.trim()});
        setTimeout(this.runFilters, 100);
    }

    toggleAvailabilityFilter(){
        this.setState(state => ({show_only_available: !(state.show_only_available)}));
        setTimeout(this.runFilters, 100);
    }

    updateSortOption(e){
        this.setState({sort_by: e.value});
        setTimeout(()=>{console.log(this.state.sort_by);this.runFilters()}, 100);
    }

    compareById(el1, el2){
        if(el1.id > el2.id){
            return 1
        }
        else if(el1.id < el2.id){
            return -1
        }
        else {
            return 0
        }
    }

    compareByHost(el1, el2){
        if(el1.host > el2.host){
            return 1
        }
        else if(el1.host < el2.host){
            return -1
        }
        else {
            return 0
        }
    }

    compareByAvailability(el1, el2){
        if(el1.availability > el2.availability){
            return 1
        }
        else if(el1.availability < el2.availability){
            return -1
        }
        else {
            return 0
        }
    }
    

    runFilters(){
        let temp = [...this.props.lobby];
        if(this.state.show_only_available){
            temp = temp.filter(game => game.availability);
        }
        if(this.state.host_filter.length > 0){
            temp = temp.filter(game => game.host.includes(this.state.host_filter))
        }
        if(this.state.sort_by === 'id'){
            temp = temp.sort(this.compareById);
        }
        if(this.state.sort_by === 'host'){
            temp = temp.sort(this.compareByHost);
        }
        if(this.state.sort_by === 'availability'){
            temp = temp.sort(this.compareByAvailability);
        }
        this.setState(state => ({games_to_show: temp}));
    }


    render(){
        return(
            <div className='wrapper lobby card blue-grey darken-1 z-depth-5'>
                <h3>Lobby</h3>
                <div className='lobby-body wrapper'>
                    <table className='striped'>
                        <thead>
                            <tr>
                                <th>Game #</th>
                                <th>Host</th>
                                <th>Availability</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.games_to_show.map(game => (
                                <tr key={game.id}>
                                    <td>{game.id}</td>
                                    <td><em>{game.host}</em></td>
                                    <td>{game.availability ? <div className='available'></div> : <div className='inprogress'></div>}</td>
                                    <td>{game.availability ? <a href='/Game' className="waves-effect waves-light btn" >Join</a> : <a className="waves-effect waves-light btn" disabled>Join</a>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <div className='row filter-wrapper'>
                    <div className='col s6'>
                        <h5>Sort by:</h5>
                        <Dropdown options={this.state.sort_options} value={this.state.sort_by} onChange={this.updateSortOption} />
                    </div>
                    <div className='col s6'>
                        <form>
                            <p>
                            <label>
                                <input type="checkbox" className='filled-in' className='filter-box' checked={this.state.show_only_available} onChange={this.toggleAvailabilityFilter}/>
                                <span className='filter-text'>Show Only Available Games</span>
                            </label>
                            </p>
                            <input type='text' value={this.state.host_filter} placeholder='Filter by Host' className='center white-text' onChange={this.updateHostFilter} />
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby;