// NEW VV

import React, { useState, FormEvent } from "react";

interface AuthState {
  title: string;
  main: string;
  // testExample: Array<{
  //     thing: string
  // }>
}

interface ThreadEditProps {
  fetchThread: () => void;

  token: string;

  updateOff: () => void;
  updateMyThread: any;
}

class ThreadEdit extends React.Component<ThreadEditProps, AuthState> {
  constructor(props: ThreadEditProps) {
    super(props);
    this.state = {
      title: this.props.updateMyThread.title,
      main: this.props.updateMyThread.main,
      // testExample: []
    };

    this.handleThreadEdit = this.handleThreadEdit.bind(this);
  }
  handleThreadEdit(e: FormEvent) {
    console.log(this.props.token);
    e.preventDefault();
    fetch(
      `http://localhost:3000/thread/update/${this.props.updateMyThread.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          thread: { title: this.state.title, main: this.state.main },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        }),
      }
    ).then((res) => {
      this.props.fetchThread();
      this.props.updateOff();
    });
  }
  handleThreadTitleEdit = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ title: e.currentTarget.value });
  };
  handleThreadMainEdit = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ main: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleThreadEdit}>
          <h3>Edit your comment here!</h3>
          <h5>
            `(Pssst, no need to be embarrassed, but we would probably change
            that too)`
          </h5>
          <input
            type="text"
            onChange={this.handleThreadTitleEdit}
            value={this.state.title}
            placeholder="Edit your title"
          />
          <input
            type="text"
            onChange={this.handleThreadMainEdit}
            value={this.state.main}
            placeholder="Edit your body (I mean the body of your comment, not your ACTUAL body. Chillout with that thought)"
          />
          <button type="submit" className="btn btn-large right">
            Submit your edit here!
          </button>
        </form>
      </div>
    );
  }
}

export default ThreadEdit;
