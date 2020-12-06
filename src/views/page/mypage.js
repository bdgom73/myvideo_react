import react from "react";
import { Cookies,withCookies } from "react-cookie";
import { instanceOf } from 'prop-types';
import { Footer,Header} from "../../routes";
import Axios from "axios";
import { Link } from "react-router-dom";

class Mypage extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        const {cookies} = props;
        this.state={
          user : cookies.get("uid") || null,
          me :{
              videos:[]
          },
          update: false
        } 
    }


    getUserAndVideo = ()=>{
        Axios.get("/me",{
            headers:{
                "Cookies" : this.state.user
            }
        })
            .then(res=>{
               this.setState({
                   me : res.data ? res.data : {videos:[]}
               })
            })
    }

   

    componentDidMount(){
        this.getUserAndVideo();
    }
    render(){
        const {me,update} = this.state;
        return(
                <>
                <Header></Header>
                <div className="mypage__wrap">
                    <div className="mypage"> 
                        <div className="mypage_center">
                            <img src={me.avatarUrl ? me.avatarUrl : "/logo192.png"} alt="MyAvatar"/>
                            <span>{me.name}</span>
                            <span>{me.nickname}</span>
                            <span>{me.email}</span>
                            <div className="mypage_btn">
                                <button type="button" onClick={()=>{this.setState({update: !update})}}>수정</button>
                            </div>                          
                        </div>
                        {
                            update ? <UpdateMypage cookies={this.state.user}/> : <></>
                        }
                        <h1>Uploaded Video</h1>
                        <div className="mypage_myvideo">                        
                            {   
                                me.videos === [] ? (
                                    <>업로드한 비디오가 없습니다.</>
                                ) :
                                me.videos.map(u=>{
                                    return(
                                        <div className="videos_wrap">
                                        <Link to={`/video/detail/${u.id}`} title={u.title+"로 바로가기"}>
                                            <video src={u.videoUrl} alt={u.title}/>
                                            <div className="videos_info" key={u.id}>
                                                <div className="videos_title" title={u.title}>{u.title}</div>
                                                <div className="videos_desc" title={u.desc}>{u.desc}</div>
                                            </div>
                                        </Link>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                </>
            );
        }
    
}

class UpdateMypage extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            avatarPreviewUrl :"",
            updatePW:false,
            msg:""
        }
    }

    avatarPreview = (e)=>{
        e.preventDefault();
        try{
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = () => {
            this.setState({  
                avatarPreviewUrl: reader.result ,
            });
            
            }
        }catch(error){
            console.log(error)
        }
        
    }

    changePassword = (e)=>{
        const {cookies} = this.props;
        e.preventDefault();
        const pwForm = {
            previousPassword : e.target[0].value,
            newPassword1 : e.target[1].value,
            newPassword2 : e.target[2].value
        }
        try{
            Axios.post("/user/passwordChange",pwForm,{
                headers:{
                    "Cookies" : cookies
                }
            }).then(res=>{
                if(res.status===400){
                    this.setState({
                        msg : "비밀번호 변경에 실패하였습니다.", 
                    })
                }else{
                    this.setState({
                        updatePW:false
                    })
                }
            })
                
        }catch(error){
            console.log(error);
        }
    }

    render(){
        const {avatarPreviewUrl,updatePW} = this.state; 
        return(
            <div className="mypage_update">
                {
                    avatarPreviewUrl ? <img src={avatarPreviewUrl} alt="avatar preview"/> : ""
                }
                <form onSubmit={()=>{console.log("a")}}>
                    <p>
                        <label for="avatar">avatar</label>
                        <input type="file" name="avatar" onChange={this.avatarPreview}></input>
                    </p>
                    <input type="text" name="name"></input>
                    <input type="submit" value="수정"></input>
                </form>
                <button type="button" onClick={()=>{this.setState({updatePW:!updatePW})}}>비밀번호 변경</button> 
                {
                    updatePW ? (
                        <>
                            <div className="change-pw_wrap" >
                                <form onSubmit={this.changePassword}>
                                    <input type="password" name="previousPassword" placeholder="현재비밀번호를 입력해주세요"></input>
                                    <input type="password" name="newPassword1" placeholder="바꿀 비밀번호를 입력해주세요"></input>
                                    <input type="password" name="newPassword2" placeholder="비밀번호를 재 입력해주세요"></input>
                                    <input type="submit" value="비밀번호 변경"></input>
                                </form>
                            </div>
                        </>
                    ) : (<></>)
                }         
            </div>
        );
    }
}
export default withCookies(Mypage);