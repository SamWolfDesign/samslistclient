import React, {useState, Component} from 'react';

interface AuthState{
    email: String,
    password: String
}

interface AuthProps{
    onClickHandler: any
}

class Login extends React.Component<AuthProps, AuthState> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onClickHandler(e: any) {
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
            <Form>
                <h1>Login here!</h1>
            </Form>
        )
    }
}