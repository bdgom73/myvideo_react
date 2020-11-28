import {Home,Login, Signup,Mypage} from "./routes"
import react from 'react';
import "./pubilc/scss/style.scss"
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
import mypage from "./views/page/mypage";
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
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/mypage" exact component={Mypage}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signup" exact component={Signup}></Route>
        </Switch>
      </Router>
    )
  }
}


export default withCookies(App);
