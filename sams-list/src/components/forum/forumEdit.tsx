import React, { useState, FormEvent } from 'react';

interface AuthState{
    title: string,
    main: string,
    mainId: string
    // testExample: Array<{
    //     thing: string
    // }>
}

interface ForumEditProps{
    handleFormEdit(e: FormEvent) : void
    // value: FormEvent
    // fetchForum: () => void
    token: string 
}

class ForumEdit extends React.Component<ForumEditProps, AuthState>{
    constructor(props: ForumEditProps) {
        super(props);
        this.state = {
            title: '',
            main: '',
            mainId: '',
            // testExample: []
            
            
        };

        this.handleFormEdit = this.handleFormEdit.bind(this)
    }
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
        handleTitleEdit = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ title: e.currentTarget.value});
        }
        handleMainEdit = (e: React.FormEvent<HTMLInputElement>): void => {
            this.setState({ main: e.currentTarget.value })
        }

        render() {
            return(
                <div>
                    <h3>Edit your post here!</h3>
                    <h5>`(Pssst, no need to be embarrassed, but we would probably change that too)`</h5>
                    <input type="text"
                    onChange={this.handleTitleEdit}
                    value={this.state.title}
                    placeholder="Edit your title"
                    />
                    <input type="text"
                    onChange={this.handleMainEdit}
                    value={this.state.main}
                    placeholder="Edit your body"
                    />
                    <button
                    className="btn btn-large right"
                    onClick={this.handleFormEdit}
                    >
                        Submit your edit here! 
                    </button>
                </div>
            )
        }
}

export default ForumEdit