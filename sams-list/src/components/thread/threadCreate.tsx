import React, { Component, FormEvent, SyntheticEvent } from "react";

interface ThreadCreateState {
  title: string;
  main: string;
  user: string;
  date: string;
}

interface ThreadCreateProps {
  // handleThreadInput: ForumCreateProps
  // value: ThreadCreateProps
  token: string;
  fetchThread: () => void;
  // handleThreadDisplay: () => void
}

class ThreadCreate extends React.Component<
  ThreadCreateProps,
  ThreadCreateState
> {
  constructor(props: ThreadCreateProps) {
    super(props);
    this.state = {
      title: "",
      main: "",
      user: "",
      date: "",
      // token: this.props.token,
    };

    this.handleThreadInput = this.handleThreadInput.bind(this);
  }
  handleThreadInput(e: FormEvent) {
    e.preventDefault();
    fetch("http://localhost:3000/thread/create", {
      method: "POST",
      body: JSON.stringify({
        thread: {
          title: this.state.title,
          main: this.state.main,
          user: this.state.user,
          date: this.state.date,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.fetchThread();
      })
      .catch((error) => console.log(error));
  }
  // logThread = () => {
  //     console.log(this.state.title);
  //     console.log(this.state.main);
  //     console.log(this.state.user);
  //     console.log(this.state.date);
  // };

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
    this.setState({ date: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <h3>Create your post here!</h3>
        <h5>Please remember to be respectful in your posting.</h5>
        <input
          type="text"
          onChange={this.handleThreadTitleInput}
          value={this.state.title}
          placeholder="Title"
        />
        <input
          type="text"
          onChange={this.handleThreadMainInput}
          value={this.state.main}
          placeholder="Main"
        />
        <input
          type="text"
          onChange={this.handleThreadUserInput}
          value={this.state.user}
          placeholder="Enter your name here! (Only cowards talk shit anonymously)!"
        />
        <input
          type="text"
          onChange={this.handleThreadDateInput}
          value={this.state.date}
          placeholder="Today's date"
        />
        <button
          className="btn btn-large right"
          onClick={this.handleThreadInput} // for some reason I had logForum here???????
        >
          Submit your post here!
        </button>
      </div>
    );
  }
}

export default ThreadCreate;
