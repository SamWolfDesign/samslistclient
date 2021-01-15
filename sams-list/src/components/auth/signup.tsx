import React, {useState, Component, FormEvent} from 'react';
// import { isConstructorDeclaration } from 'typescript';
import {TextField} from '@material-ui/core'
import APIURL from '../../helpers/environment';
import { Button } from 'antd';

// type AuthState = { onClickHandler: React.FC }
interface AuthState{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

interface Props{
    // onClickHandler: any
    // classes: any,
    // setToken : any
}
class Signup extends React.Component<{}, AuthState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
        }

        this.submitHandler = this.submitHandler.bind(this);
    }
        submitHandler(e: FormEvent) {
            e.preventDefault();
            fetch(`${APIURL}/user/create`, {
                method: 'POST',
                body: JSON.stringify({user: {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, role: this.state.role }}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })

            }) .then (
                (response) => response.json()
            ) .then((data) => {
                console.log(data)
                // this.props.setToken(data.sessionToken)
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
            // const { classes } : any = this.props
            // const onClickHandlerProps = { onClickHandler: this.props.onClickHandler}
            return (
                <form onSubmit={this.submitHandler}>
                    <h1>Sign up here!</h1>
                    <form  noValidate autoComplete="off">            
                    <input  placeholder="First Name"
                    value={this.state.firstName}
                    onChange={e => this.setState({firstName: e.target.value})}
                    required/>

                    <input placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={e => this.setState({lastName: e.target.value})}
                    required/>

                    <input placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value})}
                    required/>

                    <input placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                    required/>

                    <input placeholder="User or Admin?"
                    value={this.state.role}
                    onChange={e => this.setState({role: e.target.value})}
                    required/>
                    </form>
                    <Button type="primary">Click me to signup!</Button>
                </form>
            )
        }
    
}

export default Signup;