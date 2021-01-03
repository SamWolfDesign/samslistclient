import React, {Component} from 'react';
import './App.css';
import SignUp from "./components/auth/signup"


class App extends React.Component <{}, {}>{
  constructor(props: any) {
    super(props)

  } 
  render(){
    return (
      <div className="App">
        <SignUp onClickHandler/>
      </div>
    );
  }
}

export default App