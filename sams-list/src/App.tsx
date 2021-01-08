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
  constructor(props: {}) {
    super(props);
    this.state = {
      token: ''
    }
      this.setToken = this.setToken.bind(this)
  } 
    setToken= (newToken: string) => {
      // setp 1, getItem() from storage
      const localToken = localStorage.getItem('token')
      // step 2. check to see if there IS an item
      // if(localToken){
        console.log(localToken)
        localStorage.setItem('token', newToken)    
        this.setState({token: newToken})
      // }
      // step 3. setItem() -- set the token or locate token in the browser
      // step 4. set state (look below V)
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
            <Auth setToken={this.setToken} token={this.state.token}/>
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