import React, { useState, FormEvent } from 'react';
import ThreadCreate from './threadCreate'

interface ThreadShowAllState {
    threads: []
    mainId: string,
    title: string,
    main: string,
    user: string,
    date: string,
}

interface ThreadShowAllProps{
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

class ThreadShowAll extends React.Component<ThreadShowAllProps, ThreadShowAllState>{
    constructor(props: ThreadShowAllProps) {
        super(props);
        this.state = {
            threads: [],
            mainId: '',
            title: '',
            main: '',
            user: '',
            date: '',
        };
        this.handleThreadDisplay = this.handleThreadDisplay.bind(this);
    }
    handleThreadDisplay = () => {
        return this.state.threads.map((thread: Thread) => {
            return(
                <ul key={thread.mainId}>
                    <li>{thread.title}</li>
                    <li>{thread.main}</li>
                    <li>{thread.user}</li>
                    <li>{thread.date}</li>
                </ul>
            )}
            );
    };
    componentDidMount(){
        this.fetchThread();
    }

    fetchThread(){
        fetch(`http://localhost:3000/thread/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.threads)
            this.setState({ threads: data });
        });

    }
    render() {
        return(
            <div>
            <div>
                {this.handleThreadDisplay()}
            </div>
            <ThreadCreate fetchThread={this.fetchThread.bind(this)} token={this.props.token} />
            </div>
        )
    }
}
export default ThreadShowAll