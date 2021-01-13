// NOTE THAT THE GET ALL FOR MY FORUMS IS "/"

// THIS IS NOW PARENT OF CREATE DELETE EDIT (FORUM)

// import userEvent from '@testing-library/user-event';
import React, { useState, FormEvent } from "react";
import ForumCreate from "./forumCreate";
import ForumCard from "./forumCard";
import ForumEdit from "./forumEdit";
import ThreadShowAll from "../thread/threadDisplay";
import APIURL from '../../helpers/environment';

interface ForumShowAllState {
  forums: [];
  mainId: string;
  title: string;
  main: string;
  user: string;
  date: string;
  forumUpdate: any;
  setUpdateActive: boolean;
}

interface ForumShowAllProps {
  token: string;
  // editRes: FormEvent
}

type Forum = {
  id: number;
  mainId: string;
  title: string;
  main: string;
  user: string;
  date: string;
};
// make type for forum, then plug in as annotation (instead of :any)
class ForumShowAll extends React.Component<
  ForumShowAllProps,
  ForumShowAllState
> {
  constructor(props: ForumShowAllProps) {
    super(props);
    this.state = {
      forums: [],
      mainId: "",
      title: "",
      main: "",
      user: "",
      date: "",
      forumUpdate: {},
      setUpdateActive: false,
    };
    this.handleFormDisplay = this.handleFormDisplay.bind(this);
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

  updateMyForum = (forum: any) => {
    this.setState({
      forumUpdate: forum,
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
  fetchForum() {
    console.log("starting fetch for display");
    fetch(`${APIURL}/forum/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.forums);
        // this.state.forums.push(data.forums)
        this.setState({ forums: data }); //userData.feed?? Grab token, then dive in to grab forum assoc w/ user
      });
    console.log(this.state.forums);
    console.log("whole fetch is done");
  }
  handleFormDelete(forum: any) {
    fetch(`${APIURL}/forum/delete/${forum.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    }).then(() => this.fetchForum());
  }
  handleFormDisplay = () => {
    // console.log("display has been fired")
    return this.state.forums.map((forum: Forum) => {
      //build if else statement passing forum id through
      //so if .post contains comments
      // console.log("display has been fired2")
      return (
        <ul key={forum.mainId}>
          <li>{forum.title}</li>
          <li>{forum.main}</li>
          <li>{forum.user}</li>
          <li>{forum.date}</li>
          {/* <li>{this.handleThreadDisplay}</li> */}
          
          <li>
            <button
              onClick={() => {
                this.updateMyForum(forum);
                this.updateOn();
              }}
            >
              Edit
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                this.handleFormDelete(forum);
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
    this.fetchForum();
  }

  // fetchForum() {
  //     console.log("starting fetch for display")
  //     fetch(`http://localhost:3000/forum/`, {
  //         method: 'GET',
  //         headers: new Headers({
  //             'Content-Type': 'application/json',
  //             // 'Authorization': this.props.token,
  //         }),
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log(data)
  //         console.log(data.forums)
  //         // this.state.forums.push(data.forums)
  //         this.setState({ forums: data }); //userData.feed?? Grab token, then dive in to grab forum assoc w/ user
  //     });
  //     console.log(this.state.forums)
  //     console.log("whole fetch is done")
  // }
  // Maybe put Everything below in like a table or something for the display!?!?!?????

  // handleTitleEdit = (e: React.FormEvent<HTMLInputElement>): void => {
  //     this.setState({ title: e.currentTarget.value});
  // }
  // handleMainEdit = (e: React.FormEvent<HTMLInputElement>): void => {
  //     this.setState({ main: e.currentTarget.value })
  // }

  render() {
    return (
      <div>
        Sam's List
        <h1>
          Welcome! This is just some test to fill a spot right now. Don't read
          too much into it, ya dummy!
        </h1>
        <div>
          {this.handleFormDisplay()}
          {/* {this.state.forums.map((forum: Forum) => (
                            <ul key ={forum.id}>
                                <li><h3>{forum}</h3></li>
                                <li><h3>{forum.main}</h3></li>
                                <li><h3>{forum.user}</h3></li>
                                <li><h3>{forum.date}</h3></li>
                            </ul>
                        ))} */}
        </div>{" "}
        {/* NOTE FOR SAM. THIS IS PASSING DOWN VV */}
        <ForumCreate
          fetchForum={this.fetchForum.bind(this)}
          token={this.props.token}
        />
        {/* {this.state.} */}
        {/* <ForumEdit handleTitleEdit={this.handleTitleEdit.bind(this)} token={this.props.token}/> */}
        <ForumCard
          handleForumDisplay={this.handleFormDisplay}
          fetchForum={this.fetchForum.bind(this)}
          token={this.props.token}
        />
        {/* PASS IN DELETE, EDIT IN AS WELL. JUST LIKE FORUM CREATE WAS PASSED IN */}
        {this.state.setUpdateActive ? (
          <ForumEdit
            updateOff={this.updateOff}
            fetchForum={this.fetchForum.bind(this)}
            token={this.props.token}
            updateMyForum={this.state.forumUpdate}
          />
        ) : (
          <></>
        )}
        <ThreadShowAll token={this.props.token} />
      </div>
      // *************** pass forumFetch as prop to forumCreate component (forumDisplay acts as Index)
    );
  }
}

export default ForumShowAll;

// assoc where include reply tab, then when include comes with replies for message,

// essentially, a map within a map

// feedMapper = () => {
//     return this.state.dataTable.map((feeds: any, index) => {
//         return(
//             <div>
//                 <Card
//                     key={index}
//                     id='postCard'
//                     hoverable
//                     cover={<img id='postImage' style={{ width: 300, height: 350 }} alt="user posted image" src={feeds.image} />}
//                 >
//                     <p id='cardUname'>{feeds.userName}</p>
//                     <p id='cardText'>{feeds.text}</p>
//                     <p id='cardlink'><a target='blank'>{feeds.link}</a></p>
//                     <Comments setUsername={this.props.setUserName} setComments={this.state.comment} token={this.props.token} fetchUsers={this.fetchUsers}/>
//                 </Card>
//             </div>
//         )
//     })
// }

// componentDidMount(){
//     this.fetchFeeds();
//     this.fetchUsers(this.state.dataTable);
// }
// render() {
//     return(
//         <div id='feedDiv'>
//             <CreatePost setUsername={this.state.username} setImage={this.state.image} setText={this.state.text} setLink={this.state.link} fetchUsers={this.fetchFeeds} token={this.props.token} />
//             <Container id='feedContainer'>
//                 {this.feedMapper()}
//             </Container>
//             <Footer />
//         </div>
//     )
// }
