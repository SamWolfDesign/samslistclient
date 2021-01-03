import React, { Component } from "react";

class Forum extends React.Component {
    state = {
        title: '',
        main: '',
        user: '',
        date: '',
    };

    logForum = () => {
        console.log(this.state.title);
        console.log(this.state.main);
        console.log(this.state.user);
        console.log(this.state.date);
    };

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


















// type ForumState = {
//     title: string;
//     main: string;
//     user: string;
//     date: string;
// }

// export default class Forum extends React.Component<{}, ForumState> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             title: "",
//             main: "",
//             user: "",
//             date: ""
//         }
//     }
// }


// import React, { Component } from "react";
// import {
//     Input,
// } from "reactstrap";

// export default class ForumIndex extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             inputForum: "",
//             forumList: [],
//         };
//     }
//     addForums() {
//         let arr = this.state.forumList;
//         let obj = {
//             forum: this.state.inputForum,
//         };
//         arr.push(obj);

//         this.setState({
//             forumList: arr,
//         });
//         console.log("Forum:", this.state.forumList)
//     }
// }

