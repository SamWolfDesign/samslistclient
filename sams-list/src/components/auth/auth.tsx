import { Component } from 'react';
import Login from './login';
import Signup from './signup';
// import ForumCreate from '../forum/forumCreate';
import ForumShowAll from '../forum/forumDisplay'

interface AppState {
    
}

interface AppProps {
    setToken: (newToken: string) => void;
    token: string;
}

class Auth extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            token: '',
        };
    }
    render() {
        // const tokenProps = { token: this.state.token }
        return (
            <div>
                <h1>Auth</h1>
                <Signup />
                <Login setToken={this.props.setToken} />
                {/* <ForumShowAll token={this.props.token}/> */}
                <ForumShowAll token={this.props.token} />
            </div>
        )
    }
}

export default Auth;