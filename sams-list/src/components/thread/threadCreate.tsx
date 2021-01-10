import React, { Component, FormEvent } from "react";

interface ThreadCreateState{
    title: string,
    main: string,
    user: string,
    date: string
}

interface ThreadCreateProps{
    token: string
    fetchThread: () => void
}

class ThreadCreate extends React.Component<ThreadCreateProps, ThreadCreateState> {
    constructor(props: ThreadCreateProps) {
        super(props);
        this.state = {
            title: '',
            main: '',
            user: '',
            date: ''
        };

        this.handleThreadInput = this.handleThreadInput.bind(this);
    }
        handleThreadInput(e: FormEvent) {
            e.preventDefault();
            fetch("http://localhost:3000/thread/create", {
                method: 'POST',
                body: JSON.stringify({thread: {title: this.state.title, main: this.state.main, }}),
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                })
            }) .then((response) => response.json()
            ) .then ((data) => {
                console.log(data)
                // THIS IS WHERE YOU'LL NEED THIS.PROPS.FETCHFORUM
            }) .catch (( error ) =>
                console.log(error)
            )
        }

        handleThreadTitleInput = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ title: e.currentTarget.value });
        };
        handleThreadMainInput = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ main: e.currentTarget.value });
        };
        handleThreadUserInput = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ user: e.currentTarget.value });
        };
        handleThreadDateInput = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ date: e.currentTarget.value })
        };

        render() {
            return(
                <div>
                    <h3>Placeholder to let you know where the Thread input stuff is.</h3>
                        <input type="text"
                        onChange={this.handleThreadTitleInput}
                        value={this.state.title}
                        placeholder="Enter an eye-catching title for your response"
                        />
                        <input type="text"
                        onChange={this.handleThreadMainInput}
                        value={this.state.main}
                        placeholder="Enter your response here! (lol obvi)"
                        />
                        <input type="text"
                        onChange={this.handleThreadUserInput}
                        value={this.state.user}
                        placeholder="Enter your name here! (Only cowards talk shit anonymously)"
                        />
                        <input type="text"
                        onChange={this.handleThreadDateInput}
                        value={this.state.title}
                        placeholder="Enter today's date here!"
                        />
                        <button 
                        className="btn btn-large right"
                        onClick={this.handleThreadInput}
                        >
                            Submit your response!
                        </button>
                </div>
            )
        }
}
export default ThreadCreate