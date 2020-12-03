import react from "react";
import axios from "axios";
import { Social} from "../../routes";

export default class signup extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            message:""
        }
    }

    sendSignupInfo(event){
        event.preventDefault();
        const signupInfo = {
            email : event.target[0].value,
            password1 : event.target[2].value,
            password2 : event.target[3].value,
            name : event.target[4].value,
            nickname : event.target[5].value
        }
        axios.post('/user/signup',signupInfo)
            .then(res=>{
                console.log(res)
                if(res.data){
                    this.props.history.push("/");
                }else{
                    this.setState({
                        message:"회원가입에 실패했습니다."
                    })
                    for(let i = 1 ; i<5 ; i++){
                        event.target[i].value = "";
                    }
                    
                }
            })
        
    }

    render(){
        const {message} = this.state;
        return(
            <>
           
            <div className="signup__wrap">
                <div className="signup__header">회원가입</div>
                <div className="signup">
                    <form onSubmit={this.sendSignupInfo.bind(this)} method="post">
                        <div class="email_check">
                            <input type="email" name="email" placeholder="이메일을 입력해주세요" required></input>
                            <button type="button">회원중복검사</button>
                        </div>
                        <input type="password" name="password1" placeholder="비밀번호를 입력해주세요" required></input>
                        <input type="password" name="password2" placeholder="비밀번호를 재입력해주세요" required></input>
                        <input type="text" name="name" placeholder="이름을 입력해주세요" required></input>
                        <input type="text" name="nickname" placeholder="별명을 입력해주세요" required></input>
                        <input type="submit" value="Sign-Up"/>
                        <span className="msg">{message}</span>
                    </form>
                    
                    <Social/>
                </div> 
            </div>

            </>
        );
    }
}