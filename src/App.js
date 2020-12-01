import {Home,Login, Signup,Mypage, Upload, PrivateRouter,PubilcRouter, Logout, Search, VideoDetail} from "./routes"
import react from 'react';
import "./pubilc/scss/style.scss"
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
import path from "./path";
class App extends react.Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      user : this.props.cookies.get("uid"),
  }
  
}

  render(){
    console.log("2"+this.state.user)
    return(
      <Router>
        {/* Global Router */}
        <Route path={path.home} exact component={Home}></Route>  
        <Route path={path.search} exact component={Search}></Route>    
        <PubilcRouter path={path.login} exact component={Login}/>
        <PrivateRouter component={Logout} path={path.logout} ></PrivateRouter>
        <PubilcRouter path={path.signup} exact component={Signup}/>
        <PrivateRouter component={Mypage} path={path.me} ></PrivateRouter>
        {/* Video Router */}
        <Route path="/video/:id" exact component={VideoDetail}></Route>   
        <PrivateRouter component={Upload} path={path.upload}></PrivateRouter>
        {/* User Router */}
        <Route path="/user/:id" exact component={VideoDetail}></Route>   
      </Router>
    )
  }
}


export default withCookies(App);
