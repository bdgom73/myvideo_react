import Axios from "axios";
import react from "react";
import { Social } from "../../routes";
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';

class login extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props);
        this.state = {
          user:"",
          message:""
        };
    }

    isLogined = (event)=>{
        event.preventDefault();
        const { cookies } = this.props;
        const loginInfo = {
            email : event.target[0].value,
            password : event.target[1].value
        }
        Axios.post("/user/login", loginInfo)
            .then((res)=>{
                if(res.data !== null && res.status === 200){
                    cookies.set("uid",res.data,{path:"/"})
                    this.props.history.push("/");
                }else{
                    this.setState({
                        message:"아이디나 비밀번호가 일치하지 않습니다."
                    })
                    for(let i = 1 ; i<  (event.target.length -1) ; i++){
                        event.target[i].value = "";
                    }     
                }
            })
    }

    render(){
        const {message} = this.state;
        return(
            <div className="login__wrap">
                <div className="login">
                    <form onSubmit={this.isLogined}>
                        <p className="login_input">  
                            <input type="email" name="email" required className="login_email"></input>
                            <label for="email" className="login_email-label"><span>Email</span></label>
                        </p>
                        <p className="login_input">
                            <input type="password" name="password"  required className="login_password"></input>
                            <label for="password" className="login_password-label"><span>Password</span></label>
                        </p>
                        <span>{message}</span>
                        <input type="submit" value="Log-in"></input>
                    </form>
                    <Social/>
                </div>
               
            </div>
        );
    }
}
export default withCookies(login)