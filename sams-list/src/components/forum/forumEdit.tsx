import React, { useState } from 'react';

interface AuthState{
    title: String,
    main: String,
    
}

interface AuthProps{
    handleFormEdit: any
}

class ForumEdit extends React.Component<AuthProps, AuthState>{
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            main: '',
            
        };

        this.handleFormEdit = this.handleFormEdit.bind(this)
    }
        handleFormEdit(e: any) {
            e.preventDefault();
            fetch(`http://localhost:3000/forum/update/${mainId}`, {
                method: 'PUT',
                body: JSON.stringify({forum: {title: this.state.title, main: this.state.main}}),
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
        handleTitleEdit = (e: any) => {
            this.setState({ title: e.target.value});
        }
        handleMainInput = (e: any) => {
            this.setState({ main: e.target.value })
        }

        render() {
            return(
                
            )
        }
}