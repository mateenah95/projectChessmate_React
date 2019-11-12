import React from 'react';

import NavBar from './NavBar';
import Header from './Header';
import Footer from './Footer';

import M from 'materialize-css';

import './LoginSignup.css';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
        this.getError = this.getError.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.login = this.login.bind(this);
        this.clear = this.clear.bind(this);
    }

    updateUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    updatePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    login(){
        if(this.state.username === 'user' && this.state.password === 'user'){
            this.props.login(false);
            M.toast({html: 'Login Success!'})
            this.clear(1);
        } else if (this.state.username === 'admin' && this.state.password === 'admin') {
            this.props.login(true);
            M.toast({html: 'Login Success!'})
            this.clear(1);
        } else{
            this.setState(state => ({error: 'Invalid Credentials!'}));
            this.clear()
        }
    }

    clear(flag){
        if(flag===1){
            this.setState(state => ({
                username: '',
                password: '',
                error: ''
            }))
        }
        else{
            this.setState(state => ({
                username: '',
                password: '',
            }))
        }
        
    }

    getError(){
        if(this.state.error){
            return (
                <div className="error">
                    <h6>{this.state.error}</h6>
                </div>
            )
        }
        else{
            return ''
        }
    }

    render(){
        return (
            <div>
                <br />
                <div className='login_signup card blue-grey darken-1 z-depth-5'>
                    <Header title='Login' />
                    <br />
                    <div>
                        <div className="input-field col s6">
                            <p>Username</p>
                            <input type="text" onChange={this.updateUsername} className="validate center" placeholder="Enter username here" value={this.state.username}/>
                        </div>
                        <div className="input-field col s6">
                            <p>Password</p>
                            <input type="password" onChange={this.updatePassword} className="validate center" placeholder="Enter password here" value={this.state.password}/>
                        </div>
                        <a className="waves-effect waves-light btn inline space-around" onClick={this.login}>Login</a>
                        <a  className="waves-effect waves-light btn inline space-around" onClick={this.clear}>Clear</a>
                        <br />
                        <br />
                        {this.getError()}
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

export default Login;