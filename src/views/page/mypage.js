import react from "react";
import { Link, Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
class Mypage extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props);
        const {cookies} =props
        this.state={
            user : cookies.get("uid") || null
        } 
    }

    render(){
        const {user} = this.state;
        if(user){
            return(
                <>
                   <div className="mypage__wrap">
                       <div className="mypage">
                        12
                       </div>
                   </div>
                </>
            );
        }
        else{
           return <Redirect to="/"/>
        }  
    }
}



export default withCookies(Mypage)