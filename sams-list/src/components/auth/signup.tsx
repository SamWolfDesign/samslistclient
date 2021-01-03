import React, {useState, Component} from 'react';
// import { isConstructorDeclaration } from 'typescript';
import {TextField} from '@material-ui/core'

// type AuthState = { onClickHandler: React.FC }
interface AuthState{
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    roles: String
}

interface AuthProps{
    onClickHandler: any
}
class Signup extends React.Component<AuthProps, AuthState> {

    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            roles: ''
        }

        this.onClickHandler = this.onClickHandler.bind(this);
    }
        onClickHandler(e: any) {
            e.preventDefault();
            fetch("http://localhost:3000/user/create", {
                method: 'POST',
                body: JSON.stringify({user: {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, roles: this.state.roles }}),
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
            // this.setState({
            //     firstName: this.state.firstName;
            //     lastName: this.state.lastName;
            //     email: this.state.email;
            //     password: this.state.password;
            //     roles: this.state.roles;
            // })

        }

        render() {
            return (
                <Form>
                    <h1>Sign up here!</h1>
                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder="First Name"
                    value={this.state.firstName}
                    onChange={e => this.props.onClickHandler(e.target.value)}
                    required/>

                    <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={e => this.props.onClickHandler(e.target.value)}
                    required/>

                    <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.props.onClickHandler(e.target.value)}
                    required/>

                    <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.props.onClickHandler(e.target.value)}
                    required/>

                    <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder="User or Admin?"
                    value={this.state.roles}
                    onChange={e => this.props.onClickHandler(e.target.value)}
                    required/>

                    <button onClick = {this.props.onClickHandler}>Click me to test me!</button>
                </Form>
            )
        }
    
}

export default SignUp;