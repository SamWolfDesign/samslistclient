// NOTE THAT THE GET ALL FOR MY FORUMS IS "/"

// THIS IS NOW PARENT OF CREATE DELETE EDIT (FORUM)

// import userEvent from '@testing-library/user-event';
import React, { useState, FormEvent, SyntheticEvent } from "react";
import ForumCreate from "./forumCreate";
import ForumCard from "./forumCard";
import ForumEdit from "./forumEdit";
import ThreadShowAll from "../thread/threadDisplay";
import APIURL from '../../helpers/environment';
import { Button, Card } from 'antd';

const { Meta } = Card;

interface ForumShowAllState {
  forums: RootObject[];
  // mainId: string;
  // title: string;
  // main: string;
  // user: string;
  // date: string;
  forumUpdate: RootObject;
  setUpdateActive: boolean;
  activeForum: RootObject;
  forumId: number
}

interface ForumShowAllProps {
  token: string;
  // editRes: FormEvent
}

interface RootObject {
  id: number;
  title: string;
  main: string;
  date: string;
  posterId_fk: number;
  // createdAt: string;
  // updatedAt: string;
  userId: number;
  // user: User | null ;
  threads: Thread[];
}

interface Thread {
  id: number;
  title: string;
  main: string;
  date: string;
  threadId_fk: number;
  // createdAt: string;
  // updatedAt: string;
  userId?: any;
  forumId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  
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
    this.forumsArray = this.forumsArray.bind(this)
    this.state = {
      forumId: 0,
      forums: [],
      forumUpdate: {
        id: 0,
        title: '',
        main: '',
        date: '',
        posterId_fk: 0,
        // createdAt: '',
        // updatedAt: '',
        userId: 0,
        // user: {
        //   id: 0,
        //   firstName: '',
        //   lastName: '',
        //   email: '',
        //   password: '',
        //   role: '',
          
        // },
        threads: [],
      },
      setUpdateActive: false,
      activeForum: {
        id: 0,
        title: '',
        main: '',
        date: '',
        posterId_fk: 0,
        // createdAt: '',
        // updatedAt: '',
        userId: 0,
        threads: [],
      }
    };
    // this.handleFormDisplay = this.handleFormDisplay.bind(this);
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
  //              Authorization: this.props.token
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
        console.log('Nother lil strang ==> ', data);
        // this.state.forums.push(data.forums)
        this.forumsArray(data) //userData.feed?? Grab token, then dive in to grab forum assoc w/ user
      });
    
    console.log('Forum state: ',this.state.forums);
    console.log("whole fetch is done");
  }
  forumsArray(arrayData: RootObject[]){
    this.setState({
      forums: arrayData
    })
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
  // handleFormDisplay = () => {
  //   // console.log("display has been fired")
  //  this.state.forums.length && this.state.forums.map((forum: Forum) => {
  //     //build if else statement passing forum id through
  //     //so if .post contains comments
  //     // console.log("display has been fired2")
  //     return (
  //       // <ul key={forum.mainId}>
  //       //   <div>
  //       //   <li>{forum.title}</li>
  //       //   <li>{forum.main}</li>
  //       //   <li>{forum.user}</li>
  //       //   <li>{forum.date}</li>
  //       //   {/* <li>{this.handleThreadDisplay}</li> */}
          
  //       //   <li>
  //       //     <Button type="primary"
  //       //       onClick={() => {
  //       //         this.updateMyForum(forum);
  //       //         this.updateOn();
  //       //       }}
  //       //     >
  //       //       Edit
  //       //     </Button>
  //       //   </li>
  //       //   <li>
  //       //     <Button type="primary"
  //       //       onClick={() => {
  //       //         this.handleFormDelete(forum);
  //       //       }}
  //       //     >
  //       //       Delete
  //       //     </Button>
  //       //   </li>
  //       //   <li>
  //       //     <Button type="primary"
  //       //       onClick={() => {this.setState({activeForum: forum})}}
  //       //     >
  //       //       Create a response!!
  //       //     </Button>
  //       //   </li>
  //       //   </div>
  //       //   <div>

  //       //   </div>
  //       // </ul>
  //     );
  //   });
  // };

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



// modal render as create thread button. when click on button open modal, will also pass forum info as prop through component (will grab forum id). Make form inputs that will create fetch.



  render() {
    return (
      <div>
        <div>
            <button
              onClick={() => {
                console.log(this.state.forums)
              }}
            >
              fetch
            </button>
        </div>
            
        <h1>
          Welcome to Sam's List, the last bastion of free speech on the internet! Even though this IS your safe-space to say whatever you want, there are OBVIOUSLY exceptions. Please note that any hate speech, excessive abuse, solicitation of illicit materials, or the spreading of false information are prohibited and will result in the removal of your post, and possible banning from the site. 
        </h1>
        <br></br>
        <br></br>
        <div>
       {this.state.forums.length &&  this.state.forums.map((forum: RootObject)  =>{
         console.log("Forum --------> ", forum)
        //  this.setState({forumId: forum.id})
         return(
           
        <ul key={forum.id}>
          <div>
          <li><h1>{forum.title}</h1></li>
          <li><h3>{forum.main}</h3></li>
          {/* <li>{forum.user}</li> */}
          <li><h3>{forum.date}</h3></li>
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
          <li>
            <button
              onClick={() => {this.setState({activeForum: forum}); console.log(forum)}}
            >
              Create a response!!
              <ThreadShowAll forumId={forum.id} token={this.props.token} activeForum={this.state.activeForum} />
            </button>
          </li>
          </div>
        </ul>
         )
} ) }
          {/* {this.handleFormDisplay} */}
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
          // handleForumDisplay={this.handleFormDisplay}
          fetchForum={this.fetchForum.bind(this)}
          token={this.props.token}
        />
        {/* {this.state.} */}
        {/* <ForumEdit handleTitleEdit={this.handleTitleEdit.bind(this)} token={this.props.token}/> */}
        <ForumCard
          // handleForumDisplay={this.handleFormDisplay}
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
        {/* <ThreadShowAll token={this.props.token} activeForum={this.state.activeForum} /> */}
      </div>
      // *************** pass forumFetch as prop to forumCreate component (forumDisplay acts as Index)
    );
  }
}

export default ForumShowAll;

