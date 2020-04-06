import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./Home"
import 'bootstrap/dist/css/bootstrap.min.css';
import Addmeeting from "./Addmeeting"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div >
        <Switch>
          <Route exact path="/" component={Home}>
           
          </Route>
          <Route path="/Addmeeting" component={Addmeeting}>
          
          </Route>
        </Switch>        
      </div>
    </Router>
  );
}

export default App;
