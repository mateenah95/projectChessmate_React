import React from 'react';
import Timer from 'timer';


class GameInfo extends React.Component {
    constructor(props, time) {
        super(props);
        this.time = time;

        this.start_w = this.start_w.bind(this);
        this.stop_w = this.stop_w.bind(this);
        this.start_b = this.start_b.bind(this);
        this.stop_b = this.stop_b.bind(this);


    }

    w_remaining = -1;
    b_remaining = -1;
    whiteTimer = new Timer({
        tick: 0.25,
        ontick: function (ms) {
            const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((ms % (1000 * 60)) / 1000);
            const clock = minutes + ":" + seconds;
            document.getElementById("wtimer").innerHTML = clock;
        }
        // onend   : function() { console.log('timer ended normally') }
    });

    blackTimer = new Timer({
        tick: 0.25,
        ontick: function (ms) {
            const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((ms % (1000 * 60)) / 1000);
            const clock = minutes + ":" + seconds;
            document.getElementById("btimer").innerHTML = clock;
        }
        // onstart : function() { console.log('timer started') },
        // onstop  : function() { console.log('timer stop') },
        // onpause : function() { console.log('timer set on pause') },
        // onend   : function() { console.log('timer ended normally') }
    });

    init_clocks(initial) {
        this.w_remaining = initial;
        this.b_remaining = initial;
        const minutes = Math.floor(initial / 60);
        const seconds = Math.floor(initial % 60);
        const clock = minutes + ":" + seconds;
        document.getElementById("wtimer").innerHTML = clock;
        document.getElementById("btimer").innerHTML = clock;
    }

    start_w() {
        this.whiteTimer.start(this.w_remaining)
    }
    stop_w() {
        this.whiteTimer.pause();
        this.w_remaining = this.whiteTimer.getDuration() / 1000;
    }

    start_b() {
        this.blackTimer.start(this.b_remaining)
    }
    stop_b() {
        this.blackTimer.pause();
        this.b_remaining = this.blackTimer.getDuration() / 1000;
    }


    render() {
        return (
            <div className='wrapper gametime card blue-grey darken-1 z-depth-5'>
                <h3>Time</h3>
                <table className='striped'>
                    <thead>
                        <tr>
                            {/*<th className='filter-text'>White {this.props.user ? "(" + this.props.user.username + ")" : ""}</th>*/}
                            <th className='filter-text'> White </th>
                            <th className='filter-text'> Black </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='filter-text' id='wtimer'>0</td>
                            <td className='filter-text' id='btimer'>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GameInfo;
