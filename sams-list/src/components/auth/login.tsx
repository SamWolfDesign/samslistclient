// import classes from '*.module.css';
import React, {useState, Component, FormEvent} from 'react';

interface AuthState{
    email: string,
    password: string
}

interface AuthProps{
    // onClickHandler: any
    setToken: (newToken: string) => void;
}

class Login extends React.Component<AuthProps, AuthState> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.submitHandler = this.submitHandler.bind(this);
    }
    submitHandler(e: FormEvent) {
        e.preventDefault();
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({user: {email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then (
            (response) => response.json()
        ) .then((data) => {
            console.log(data)
        }) .catch (( error) =>
            console.log(error)
        )
    }

    render() {
        return(
            <form>
                <h1>Login here!</h1>
                <form onSubmit={this.submitHandler}>
                    <input placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value})}
                    required/>

                    <input placeholder="Password"
                    value={this.state.password}
                    type="password"
                    onChange={e => this.setState({password: e.target.value})}
                    required/>
                </form>
                <button>Click me to sign in!</button>
            </form>
        )
    }
}

export default Login