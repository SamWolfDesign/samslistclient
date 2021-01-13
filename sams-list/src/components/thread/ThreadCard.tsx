//On click, should call function that says "yo, we're going back up to the top and gonna fire thread create". Then will bubble thread create, into thread display, then down into thread card (which does the same as forum card duh).
import React, { useState, FormEvent } from "react";
import APIURL from '../../helpers/environment';

interface ThreadDeleteState {
  threads: [];
  mainId: string;
  // deleteForum: FormEvent
}

interface ThreadDeleteProps {
  // handleFormDelete: FormEvent
  // onClick: FormEvent
  token: string;
  handleThreadDisplay: () => Array<any>;
  fetchThread(): void;
}

type Thread = {
  id: number;
  mainId: string;
  title: string;
  main: string;
  user: string;
  date: string;
};

class ThreadCard extends React.Component<ThreadDeleteProps, ThreadDeleteState> {
  constructor(props: ThreadDeleteProps) {
    super(props);
    this.state = {
      mainId: "",
      threads: [],
      // deleteForum: //SOMETHING GOES HERE OBVI
    };

    this.handleThreadDelete = this.handleThreadDelete.bind(this);
  }
  handleThreadDelete(e: FormEvent) {
    e.preventDefault();
    fetch(`${APIURL}/thread/delete/${this.state.mainId}`, {
      method: "DELETE",
      body: JSON.stringify({ forum: { mainId: this.state.mainId } }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token,
      }),
    });
    // .then(() => this.state.deleteForum());
  }

  render() {
    return (
      <div>
        <div>
          {/* {this.props.handleFormDisplay()} */}
          {/*   */}
        </div>
        <button className="btn btn-large" onClick={this.handleThreadDelete}>
          I am a button.
        </button>
      </div>
    );
  }
}

export default ThreadCard;
