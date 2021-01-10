import React, { useState, FormEvent } from 'react';

interface AuthState{
    title: string,
    main: string,
    mainId: string
}

interface ThreadEditProps{
    handleThreadEdit: FormEvent
}

class ThreadEdit extends React.Component<ThreadEditProps, AuthState>{
    constructor(props: ThreadEditProps) {
        super(props);
        this.state = {
            title: '',
            main: '',
            mainId: ''
        };
        this.handleThreadEdit = this.handleThreadEdit.bind(this)
    }
        handleThreadEdit(e:FormEvent){
            e.preventDefault();
            fetch(`http://localhost:3000/thread/update/${this.state.mainId}`, {
                method: 'PUT',
                body: JSON.stringify({thread: {title: this.state.title, main: this.state.main}}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }) .then((response) => response.json()
            ) .then ((data) => {
                console.log(data)
            }) .catch ((error ) => 
                console.log(error)
            )
        }
        handleThreadTitleEdit = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ title: e.currentTarget.value});
        }
        handleThreadMainEdit = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ main: e.currentTarget.value })
        }

        render(){
            return(
                <div>
                    <h3>`Edit your comment here! (Yeah, we would probably change that too.)`</h3>
                    <input type="text"
                    onChange={this.handleThreadTitleEdit}
                    value={this.state.title}
                    placeholder="Edit your title"
                    />
                    <input type="text"
                    onChange={this.handleThreadMainEdit}
                    value={this.state.main}
                    placeholder="Edit your body (I mean the text you wrote, chillout with that thought)"
                    />
                    <button
                    className="btn btn-large right"
                    onClick={this.handleThreadEdit}
                    >
                        Submit your changes here!
                    </button>
                </div>
            )
        }
}

export default ThreadEdit