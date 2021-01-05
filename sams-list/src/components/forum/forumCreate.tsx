import React, { Component } from "react";

interface AuthState{
    title: String,
    main: String,
    user: String,
    date: String
}

interface AuthProps{
    handleFormInput: any
    value: any
}

class Forum extends React.Component<AuthProps, AuthState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            main: '',
            user: '',
            date: '',
        };

        this.handleFormInput = this.handleFormInput.bind(this);
    }
        handleFormInput(e: any) {
            e.preventDefault();
            fetch("http://localhost:3000/forum/create", {
                method: 'POST',
                body: JSON.stringify({forum: {title: this.state.title, main: this.state.main, user: this.state.user, date: this.state.date}}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }) .then((response) => response.json()
            ) .then ((data) => {
                console.log(data)
            }) .catch (( error ) =>
                console.log(error)
            ) 
        }
    // logForum = () => {
    //     console.log(this.state.title);
    //     console.log(this.state.main);
    //     console.log(this.state.user);
    //     console.log(this.state.date);
    // };

    handleTitleInput = (e: any) => {
        this.setState({ title: e.target.value });
    };
    handleMainInput = (e: any) => {
        this.setState({ main: e.target.value});
    };
    handleUserInput = (e: any) => {
        this.setState({ user: e.target.value });
    };
    handleDateInput = (e: any) => {
        this.setState({ date: e.target.value })
    };

    render() {
        return(
            <div>
                <h3>Create your post here!</h3>
                <h5>Please remember to be respectful in your posting.</h5>
                    <input type="text"
                    onChange={this.handleTitleInput}
                    value={this.state.title}
                    placeholder="Title"
                    />
                    <input type="text"
                    onChange={this.handleMainInput}
                    value={this.state.main}
                    placeholder="Main"
                    />
                    <input type="text"
                    value={this.state.user}
                    />
                    <input type="text"
                    onChange={this.handleDateInput}
                    value={this.state.date}
                    placeholder="Today's date"
                    />
                    <button
                    className="btn btn-large right"
                    onClick={this.logForum}
                    >
                        Submit your post here!
                    </button>
            </div>
        )
    }
}

export default Forum