import { Component } from 'react';
import Login from './login';
import Signup from './signup';

interface AppState {
    token: string;
}

interface AppProps {
    setToken: (newToken: string) => void;
}

class Auth extends Component<AppProps, AppState> {
    constructor(props: any) {
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
            </div>
        )
    }
}

export default Auth;