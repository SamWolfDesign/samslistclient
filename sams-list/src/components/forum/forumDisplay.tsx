// NOTE THAT THE GET ALL FOR MY FORUMS IS "/"

// THIS IS NOW PARENT OF CREATE DELETE EDIT (FORUM)

// import userEvent from '@testing-library/user-event';
import React, { useState, FormEvent } from 'react';
import ForumCreate from './forumCreate'
import ForumCard from './forumCard'
import ForumEdit from './forumEdit'

interface ForumShowAllState {
    forums : [] 
    mainId : string,
    title: string,
    main: string,
    user: string,
    date: string,
}

interface ForumShowAllProps{
    token: string
}

type Forum = {
        id: number;
        mainId: string;
        title: string;
        main: string;
        user: string;
        date: string;
}
// make type for forum, then plug in as annotation (instead of :any)
class ForumShowAll extends React.Component<ForumShowAllProps, ForumShowAllState>{
    constructor(props: ForumShowAllProps) {
        super(props);
        this.state = {
            forums: [],
            mainId : '',
            title: '',
            main: '',
            user: '',
            date: '',
        };
        this.handleFormDisplay = this.handleFormDisplay.bind(this);
    }
    //could be type annotations, or index?
    //map method, obj mapping over and key (most ppl put index)

    // index() {

    // }
    handleFormEdit(e: FormEvent) {
        e.preventDefault();
        fetch(`http://localhost:3000/forum/update/${this.state.mainId}`, {
            method: 'PUT',
            body: JSON.stringify({forum: {title: this.state.title, main: this.state.main}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }) .then((response) => response.json()
        ) .then ((data) => {
            console.log(data)
        }) .catch ((error ) => 
            console.log(error)
        )
    }
                            // : Array<any> <--- NOTE FOR SAM: I HAD THIS NEXT TO PAREN ON 53
        handleFormDisplay = ()  => {
            console.log("display has been fired")
            return this.state.forums.map((forum: Forum) => {
                console.log("display has been fired2")
                return(
                <ul key={forum.mainId}>
                    <li>{forum.title}</li>
                    <li>{forum.main}</li>
                    <li>{forum.user}</li>
                    <li>{forum.date}</li>
                </ul>
            )}
            );
        };  

        componentDidMount() {
            this.fetchForum();
        }

        

        fetchForum() {
            console.log("starting fetch for display")
            fetch(`http://localhost:3000/forum/`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                }),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.forums)
                // this.state.forums.push(data.forums)
                this.setState({ forums: data }); //userData.feed?? Grab token, then dive in to grab forum assoc w/ user
            });
            console.log(this.state.forums)
            console.log("whole fetch is done")
        }
                        // Maybe put Everything below in like a table or something for the display!?!?!?????
        
                        // handleTitleEdit = (e: React.FormEvent<HTMLInputElement>): void => {
                        //     this.setState({ title: e.currentTarget.value});
                        // }
                        // handleMainEdit = (e: React.FormEvent<HTMLInputElement>): void => {
                        //     this.setState({ main: e.currentTarget.value })
                        // }

        render() {
            return (
                <div>Sam's List
                    <h1>Welcome! This is just some test to fill a spot right now. Don't read too much into it, ya dummy!</h1>
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
                    </div>   {/* NOTE FOR SAM. THIS IS PASSING DOWN VV */}
                    <ForumCreate fetchForum={this.fetchForum.bind(this)} token={this.props.token} />
                    <ForumEdit handleFormEdit={this.handleFormEdit} token={this.props.token} />

                    {/* <ForumEdit handleTitleEdit={this.handleTitleEdit.bind(this)} token={this.props.token}/> */}

                    {/* <ForumCard handleForumDisplay={this.handleFormDisplay} fetchForum={this.fetchForum.bind(this)} token={this.props.token} /> */}
                    {/* PASS IN DELETE, EDIT IN AS WELL. JUST LIKE FORUM CREATE WAS PASSED IN */}
                </div>
                // *************** pass forumFetch as prop to forumCreate component (forumDisplay acts as Index)
            )
        }

}

export default ForumShowAll







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
