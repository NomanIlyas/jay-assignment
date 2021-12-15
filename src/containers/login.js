import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CallumAPI } from '../Api/api'
import { useState } from 'react';
import {UserProfile} from './session';

export default class LoginPageComponent extends Component {

    state = {
        email: '',
        password: ''
    }

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { iSubmitted, error } = this.state;
        return (
            <div class="signup-form">
                <form action="/examples/actions/confirmation.php" method="post">
                    <h2>Login</h2>
                    <p class="hint-text">Login here</p>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12 col-12 mb-2"><input type="email" onChange={this.handleInputChange} class="form-control" name="email" placeholder="Email" required="required" /></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" name="password" onChange={this.handleInputChange} placeholder="Password" required="required" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success btn-lg btn-block" onClick={this.handleSubmit}>
                            {iSubmitted ? (<i style={{ 'color': 'white' }} class="fas fa-circle-notch fa-spin"></i>) : ''}
                            Sign in</button>
                    </div>
                    <div className="text-danger">{error}</div>
                    <Link to='/signup'>Not have an account? Register here</Link>
                </form>

            </div>)

    }

    fileChange = ($event) => {
        this.setState({ file: $event.target.files[0] })
    }
    handleSubmit(event) {
        const { email, password } = this.state;
        event.preventDefault();
        this.setState({ iSubmitted: true, error: '' });
        if(this.ValidateEmail(this.state.email)) {
            CallumAPI.all().then(celebrities => {

                const celebrity = celebrities.filter(celebrity => {
                    return celebrity.email === email;
                })
                if(celebrity.length)
                {
                    if (celebrity[0].password === password) {
                        this.props.onLogin(celebrity[0]);
                        this.setState({ iSubmitted: false, error: '' });
                        window.sessionStorage.setItem("login", celebrity[0].id);
                        window.location = '/'
                    }
                    else {
                        this.setState({ iSubmitted: false, error: 'Password is Not Correct!' });
                    }
                }
                else {
                    this.setState({ iSubmitted: false, error: 'Email Not Found!' });
                }
    
            }).catch(err => { this.setState({ error: 'Something Went Wrong', iSubmitted: false }) })
        }
    }

    handleInputChange(event) {

        var key = event.target.name;
        var value = event.target.value;
        var obj = {};
        obj[key] = value;
        this.setState({ [key]: value });
    }

    onGenderChange = (e) => {
        this.setState({ gender: e.target.value })
    
    }

    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

}

