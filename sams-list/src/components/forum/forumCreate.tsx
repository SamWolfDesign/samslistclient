

import React, { Component, FormEvent, SyntheticEvent } from "react";

interface ForumCreateState{
    title: string,
    main: string,
    user: string,
    date: string
}

interface ForumCreateProps{
    // handleFormInput: ForumCreateProps
    // value: ForumCreateProps
    token: string 
    fetchForum: () => void
    // handleForumDisplay: () => void
}

class ForumCreate extends React.Component<ForumCreateProps, ForumCreateState> {
    constructor(props: ForumCreateProps) {
        super(props);
        this.state = {
            title: '',
            main: '',
            user: '',
            date: '',
            // token: this.props.token,
        };

        this.handleFormInput = this.handleFormInput.bind(this);
    }
        handleFormInput(e: FormEvent) {
            e.preventDefault();
            fetch("http://localhost:3000/forum/create", {
                method: 'POST',
                body: JSON.stringify({forum: {title: this.state.title, main: this.state.main, user: this.state.user, date: this.state.date}}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                })
            }) .then((response) => response.json()
            ) .then ((data) => {
                console.log("WORK MOTHERFUCKER I'LL KILL YOU")
                console.log(data)
                // ********** call fetchForum() as props  to call it so once user creates something it displays.
                this.props.fetchForum()
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

    handleTitleInput = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ title: e.currentTarget.value });
    };
    handleMainInput = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ main: e.currentTarget.value});
    };
    handleUserInput = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ user: e.currentTarget.value });
    };
    handleDateInput = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ date: e.currentTarget.value })
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
                    onChange={this.handleUserInput}
                    value={this.state.user}
                    placeholder="Enter your name here!"
                    />
                    <input type="text"
                    onChange={this.handleDateInput}
                    value ={this.state.date}
                    placeholder="Today's date"
                    />
                    <button
                    className="btn btn-large right"
                    onClick={this.handleFormInput} // for some reason I had logForum here???????
                    >
                        Submit your post here!
                    </button>
            </div>
        )
    }
}

export default ForumCreate