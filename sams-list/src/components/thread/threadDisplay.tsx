// NOTE THAT THE GET ALL FOR MY FORUMS IS "/"

// THIS IS NOW PARENT OF CREATE DELETE EDIT (FORUM)

// import userEvent from '@testing-library/user-event';
import React, { useState, FormEvent } from "react";
import ThreadCreate from "./threadCreate";
import ThreadCard from "./ThreadCard";
import ThreadEdit from "./ThreadEdit";

interface ThreadShowAllState {
  threads: [];
  mainId: string;
  title: string;
  main: string;
  user: string;
  date: string;
  threadUpdate: any;
  setUpdateActive: boolean;
}

interface ThreadShowAllProps {
  token: string;
  // editRes: FormEvent
}

type Thread = {
  id: number;
  mainId: string;
  title: string;
  main: string;
  user: string;
  date: string;
};
// make type for forum, then plug in as annotation (instead of :any)
class ThreadShowAll extends React.Component<
  ThreadShowAllProps,
  ThreadShowAllState
> {
  constructor(props: ThreadShowAllProps) {
    super(props);
    this.state = {
      threads: [],
      mainId: "",
      title: "",
      main: "",
      user: "",
      date: "",
      threadUpdate: {},
      setUpdateActive: false,
    };
    this.handleThreadDisplay = this.handleThreadDisplay.bind(this);
  }
  //could be type annotations, or index?
  //map method, obj mapping over and key (most ppl put index)

  // index() {

  // }
  // handleFormEdit(e: FormEvent) {
  //     e.preventDefault();
  //     fetch(`http://localhost:3000/forum/update/${this.state.mainId}`, {
  //         method: 'PUT',
  //         body: JSON.stringify({forum: {title: this.state.title, main: this.state.main}}),
  //         headers: new Headers({
  //             'Content-Type': 'application/json',
  //             'Authorization': this.props.token
  //         })
  //     }) .then((response) => response.json()
  //     ) .then ((data) => {
  //         console.log(data)
  //     }) .catch ((error ) =>
  //         console.log(error)
  //     )
  // }
  // : Array<any> <--- NOTE FOR SAM: I HAD THIS NEXT TO PAREN below

  updateMyThread = (thread: any) => {
    this.setState({
      threadUpdate: thread,
    });
  };

  updateOn = () => {
    this.setState({
      setUpdateActive: true,
    });
  };

  updateOff = () => {
    this.setState({
      setUpdateActive: false,
    });
  };
  fetchThread() {
    console.log("starting fetch for display thread");
    fetch(`http://localhost:3000/thread/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        // 'Authorization': this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.threads);
        this.setState({ threads: data }); //userData.feed?? Grab token, then dive in to grab thread assoc w/ user
      });
    console.log(this.state.threads);
    console.log("whole fetch is done");
  }
  handleThreadDelete(thread: any) {
    fetch(`http://localhost:3000/thread/delete/${thread.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    }).then(() => this.fetchThread());
  }
  handleThreadDisplay = () => {
    // console.log("display has been fired")
    return this.state.threads.map((thread: Thread) => {
      // console.log("display has been fired2")
      return (
        <ul key={thread.mainId}>
          <li>{thread.title}</li>
          <li>{thread.main}</li>
          <li>{thread.user}</li>
          <li>{thread.date}</li>
          <li>
            <button
              onClick={() => {
                this.updateMyThread(thread);
                this.updateOn();
              }}
            >
              Edit
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                this.handleThreadDelete(thread);
              }}
            >
              Delete
            </button>
          </li>
        </ul>
      );
    });
  };

  componentDidMount() {
    this.fetchThread();
  }

  render() {
    return (
      <div>
        Sam's List
        <div>{this.handleThreadDisplay()}</div>{" "}
        {/* NOTE FOR SAM. THIS IS PASSING DOWN VV */}
        <ThreadCreate
          fetchThread={this.fetchThread.bind(this)}
          token={this.props.token}
        />
        {/* {this.state.} */}
        {/* <ForumEdit handleTitleEdit={this.handleTitleEdit.bind(this)} token={this.props.token}/> */}
        <ThreadCard
          handleThreadDisplay={this.handleThreadDisplay}
          fetchThread={this.fetchThread.bind(this)}
          token={this.props.token}
        />
        {this.state.setUpdateActive ? (
          <ThreadEdit
            updateOff={this.updateOff}
            fetchThread={this.fetchThread.bind(this)}
            token={this.props.token}
            updateMyThread={this.state.threadUpdate}
          />
        ) : (
          <></>
        )}
      </div>
      // *************** pass forumFetch as prop to forumCreate component (forumDisplay acts as Index)
    );
  }
}

export default ThreadShowAll;
