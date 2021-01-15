// NOTE THAT THE GET ALL FOR MY FORUMS IS "/"

// THIS IS NOW PARENT OF CREATE DELETE EDIT (FORUM)

// import userEvent from '@testing-library/user-event';
import React, { useState, FormEvent } from "react";
import ThreadCreate from "./threadCreate";
import ThreadCard from "./ThreadCard";
import ThreadEdit from "./ThreadEdit";
import APIURL from '../../helpers/environment';
import { Button } from 'antd';

interface ThreadShowAllState {
  threads: [];
  mainId: string;
  title: string;
  main: string;
  user: string;
  date: string;
  threadUpdate: any;
  setUpdateActive: boolean;
  forumId: number
}

interface ThreadShowAllProps {
  token: string;
  // editRes: FormEvent
  activeForum: any
  forumId: number
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
      forumId: this.props.activeForum.id
    };
    this.handleThreadDisplay = this.handleThreadDisplay.bind(this);
  }
  //could be type annotations, or index?
  //map method, obj mapping over and key (most ppl put index)

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
    fetch(`${APIURL}/thread/${this.props.forumId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("test one", data.threads);
        this.setState({ threads: data }); //userData.feed?? Grab token, then dive in to grab thread assoc w/ user
      });
    console.log("test two", this.state.threads);
    console.log("whole fetch is done");
  }
  handleThreadDelete(thread: any) {
    fetch(`${APIURL}/thread/delete/${thread.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      }),
    })
      .then(() => this.fetchThread())
      .then(() => console.log("thread deleted"));
  }
  handleThreadDisplay = () => {
    // console.log("display has been fired") //this.state.threads.length &&
   {this.state.threads.map((thread: Thread, index: number) => {
      // console.log("display has been fired2")
      return (
        <ul key={index}>
          <li>{thread.title}</li>
          <li>{thread.main}</li>
          <li>can you see me!?!?!?!?!?!</li>
          <li>{thread.user}</li>
          <li>{thread.date}</li>
          <li>
            <Button type="primary"
              onClick={() => {
                this.updateMyThread(thread);
                this.updateOn();
              }}
            >
              Edit
            </Button>
          </li>
          <li>
            <Button type="primary"
              onClick={() => {
                this.handleThreadDelete(thread);
              }}
            >
              Delete
            </Button>
          </li>
        </ul>
      );
    })};
  };

  componentDidMount() {
    this.fetchThread();
  }

  render() {
    return (
      <div>
        Sam's List
        <div>{() => this.handleThreadDisplay()}</div>{" "}
        {/* NOTE FOR SAM. THIS IS PASSING DOWN VV */}
        {this.state.threads.map((thread: Thread, index: number) => {
      // console.log("display has been fired2")
      return (
        <ul key={index}>
          <li>{thread.title}</li>
          <li>{thread.main}</li>
          <li>can you see me!?!?!?!?!?!</li>
          <li>{thread.user}</li>
          <li>{thread.date}</li>
          <li>
            <Button type="primary"
              onClick={() => {
                this.updateMyThread(thread);
                this.updateOn();
              }}
            >
              Edit
            </Button>
          </li>
          <li>
            <Button type="primary"
              onClick={() => {
                this.handleThreadDelete(thread);
              }}
            >
              Delete
            </Button>
          </li>
        </ul>
      );
    })};
        <ThreadCreate
          fetchThread={this.fetchThread.bind(this)}
          token={this.props.token}
          forumId={this.props.forumId}
        />
        {/* {this.state.} */}
        {/* <ForumEdit handleTitleEdit={this.handleTitleEdit.bind(this)} token={this.props.token}/> */}
        <ThreadCard
         handleThreadDisplay={this.handleThreadDisplay}
          fetchThread={this.fetchThread.bind(this)}
          token={this.props.token}
          // forumId={this.state.forumId}
          
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
