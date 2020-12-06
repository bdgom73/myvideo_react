import react from "react";
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
class logout extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    logout = ()=>{
        const {cookies}= this.props;
        cookies.remove("uid");       
    }
    
    render(){
        this.logout();
        return(
            <>
                <Redirect to="/"/>
            </>
        );
        
       
    }
}
export default withCookies(logout)