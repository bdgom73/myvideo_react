import {Home,Login, Signup,Mypage, Upload, PrivateRouter,PubilcRouter, Logout, Search} from "./routes"
import react from 'react';
import "./pubilc/scss/style.scss"
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';

class App extends react.Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      user : []
  }
  
}

  render(){
    return(
      <Router>
        {/* Global Router */}
        <Route path="/" exact component={Home}></Route>   
        <Route path="/search" exact component={Search}></Route>    
        <PubilcRouter path="/login" exact component={Login}/>
        <PrivateRouter component={Logout} path="/logout" ></PrivateRouter>
        <PubilcRouter path="/signup" exact component={Signup}/>
      
        <PrivateRouter component={Mypage} path="/me" ></PrivateRouter>
        {/* Video Router */}
        <PrivateRouter component={Upload} path="/video/upload"></PrivateRouter>
      </Router>
    )
  }
}


export default withCookies(App);
