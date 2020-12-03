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
        this.setState = {
            
        }
    }

    logout = ()=>{
        const {cookies}= this.props;
        cookies.remove("uid");
        
    }
    
    componentWillMount(){
        this.logout();
    }

    render(){
        return(
                <Redirect to="/"/>
        );
        
       
    }
}
export default withCookies(logout)