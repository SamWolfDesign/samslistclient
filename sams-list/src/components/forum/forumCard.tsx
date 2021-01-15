//On click, should call function that says "yo, we're going back up to the top and gonna fire thread create". Then will bubble thread create, into thread display, then down into thread card (which does the same as forum card duh).
import React, { useState, FormEvent } from 'react';
import APIURL from '../../helpers/environment';


interface ForumDeleteState {
    forums: []
    mainId : string
    // deleteForum: FormEvent
}

interface ForumDeleteProps {
    // handleFormDelete: FormEvent
    // onClick: FormEvent
    token: string
    // handleForumDisplay: () => void
    fetchForum() : void
}

type Forum = {
    id: number;
    mainId: string;
    title: string;
    main: string;
    user: string;
    date: string;
}

class ForumCard extends React.Component<ForumDeleteProps, ForumDeleteState>{
    constructor(props: ForumDeleteProps) {
        super(props);
        this.state = {
            mainId: '',
            forums: []
            // deleteForum: //SOMETHING GOES HERE OBVI
        };

        this.handleFormDelete = this.handleFormDelete.bind(this)
    }
        handleFormDelete(e: FormEvent) {
            e.preventDefault();
            fetch(`${APIURL}/forum/delete/${this.state.mainId}`, {
                method: 'DELETE',
                body: JSON.stringify({forum: {mainId: this.state.mainId}}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                })
            }) 
            // .then(() => this.state.deleteForum());
        }

        render() {
            return(
                <div>
                    <div>
                        {/* {this.props.handleFormDisplay()} */}
                        {/*   */}
                    </div>
                    <button
                        className="btn btn-large"
                        onClick={this.handleFormDelete}
                        >
                            I am a button.
                    </button>
                </div>
            )
        }
}

export default ForumCard



// TRISTAN OSHER (sp) TAYLOR REC FROM LEARNING GYM

// REMEMBER SEAN DWYER 