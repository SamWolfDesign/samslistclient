import React, {Component} from 'react';
import './App.css';
// import Signup from "./components/auth/signup"
import Auth from "./components/auth/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

interface AppState {
  token: string
}

class App extends React.Component <{}, AppState>{
  constructor(props: any) {
    super(props);
    this.state = {
      token: ''
    }

  } 
    setToken= (newToken: string) => {
      this.setState({token: newToken})
    }
  render(){
    // const tokenProps ={token: this.state.token}
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li><Link to='/'>Auth</Link></li>
              
            </ul>
          </div>
        <hr />
        <Switch>
          <Route exact path='/'>
            <Auth setToken={this.setToken}/>
          </Route>
          <Route exact path='/home'>
          </Route>
        </Switch>
        </Router>

        {/* <header className="App-header">
          <p>{this.state.token}</p>
          <Auth {...tokenProps} />
        </header> */}
      </div>
    );
  }
}

export default App