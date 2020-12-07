import react from 'react';
import { Redirect, Route } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
class privateRouter extends react.Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props){
    super(props);
    const {cookies} =props;
    this.state = {
      user : cookies.get("uid") || null
  }
  
}

  render(){
    const {component,path,exact} = this.props;
    const Component = component;
    const {user} = this.state;
    console.log(user)
    return(
            <Route
                path={path}
                render={({...props})=>{
                   return (user ? <Component {...props} user={user}/> : <Redirect to="/login"/>) 
                }}
                exact = {exact === null ? true : exact === true ? exact : false}
            />)
    }
  
}


export default withCookies(privateRouter);
