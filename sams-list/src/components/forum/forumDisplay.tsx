// NOTE THAT THE GET ALL FOR MY FORUMS IS "/"

// THIS IS NOW PARENT OF CREATE DELETE EDIT (FORUM)

// import userEvent from '@testing-library/user-event';
import React, { useState, FormEvent } from 'react';
import ForumCreate from './forumCreate'

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

        handleFormDisplay = () : void => {
            this.state.forums.map((forum: Forum) => (
                <ul key={forum.mainId}>
                    <li>{forum.title}</li>
                    <li>{forum.main}</li>
                    <li>{forum.user}</li>
                    <li>{forum.date}</li>
                </ul>
            ));
        };  

        componentDidMount() {
            this.fetchForum();
        }

        fetchForum() {
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
                this.setState({ forums: data });
            });
            console.log(this.state.forums)
        }
                        // Maybe put Everything below in like a table or something for the display!?!?!?????
        render() {
            return (
                <div>Sam's List
                    <h1>Welcome! This is just some test to fill a spot right now. Don't read too much into it, ya dummy!</h1>
                    <div>
                        {/* {this.handleFormDisplay()} */}
                        {/* {this.state.forums.map((forum: Forum) => (
                            <ul key ={forum.id}>
                                <li><h3>{forum}</h3></li>
                                <li><h3>{forum.main}</h3></li>
                                <li><h3>{forum.user}</h3></li>
                                <li><h3>{forum.date}</h3></li>
                            </ul>
                        ))} */}
                    </div>
                    <ForumCreate fetchForum= {this.fetchForum.bind(this)} token={this.props.token} />
                    {/* PASS IN DELETE, EDIT IN AS WELL. JUST LIKE FORUM CREATE WAS PASSED IN */}
                </div>
                // *************** pass forumFetch as prop to forumCreate component (forumDisplay acts as Index)
            )
        }

}

export default ForumShowAll