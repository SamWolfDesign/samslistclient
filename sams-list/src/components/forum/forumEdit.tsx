import React, { useState, FormEvent } from 'react';

interface AuthState{
    title: string,
    main: string,
    // testExample: Array<{
    //     thing: string
    // }>
}

interface ForumEditProps{
    // handleFormEdit(e: FormEvent) : void
    fetchForum: () => void
    // value: FormEvent
    // fetchForum: () => void
    token: string 
    // editRes: FormEvent
    updateOff: () => void
    updateMyForum: any
}

class ForumEdit extends React.Component<ForumEditProps, AuthState>{
    constructor(props: ForumEditProps) {
        super(props);
        this.state = {
            title: this.props.updateMyForum.title,
            main: this.props.updateMyForum.main,
            // testExample: []
            
            
        };

        this.handleFormEdit = this.handleFormEdit.bind(this)
    }
        handleFormEdit(e: FormEvent) {
            console.log(this.props.token);
            e.preventDefault();
            fetch(`http://localhost:3000/forum/update/${this.props.updateMyForum.id}`, {
                method: 'PUT',
                body: JSON.stringify({forum: {title: this.state.title, main: this.state.main}}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                })
            }) .then((res) => {this.props.fetchForum(); this.props.updateOff()});
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
                    <form onSubmit={this.handleFormEdit}>

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
                    type="submit"
                    className="btn btn-large right"
                    >
                        Submit your edit here! 
                    </button>
                    </form>
                </div>
            )
        }
}

export default ForumEdit