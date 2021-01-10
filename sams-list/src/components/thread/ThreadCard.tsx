import React, { useState, FormEvent } from 'react';

interface ThreadDeleteState {
    threads: []
    mainId : string
}

interface ThreadDeleteProps {
    handleThreadDelete: FormEvent
    onClick: FormEvent
    token: string
}

type Thread = {
    id: number;
    mainId: string;
    title: string;
    main: string;
    user: string;
    date: string;
}

class ThreadCard extends React.Component<ThreadDeleteProps, ThreadDeleteState>{
    constructor(props: ThreadDeleteProps) {
        super(props);
        this.state = {
            mainId: '',
            threads: []
        };
        this.handleThreadDelete = this.handleThreadDelete.bind(this)
    }
        handleThreadDelete(e: FormEvent) {
            e.preventDefault();
            fetch(`http://localhost:3000/thread/delete/${this.state.mainId}`,{
                method: 'DELETE',
                body: JSON.stringify({thread: {mainId: this.state.mainId}}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                })
            })
        }

        render(){
            return(
                <div>
                    <div>
                        {this.state.threads.map((thread: Thread) =>(
                            <ul key={thread.id}>
                                <li><h3>{thread}</h3></li>
                                <li><h3>{thread.main}</h3></li>
                                <li><h3>{thread.user}</h3></li>
                                <li><h3>{thread.date}</h3></li>
                            </ul>
                        ))}
                    </div>
                    <button
                        className="btn btn-large"
                        onClick={this.handleThreadDelete}
                        >
                            You DO have the ability to click me.
                        </button>
                </div>
            )
        }
}

export default ThreadCard