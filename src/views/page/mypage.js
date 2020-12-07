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
          update: false,
          updateAvatar : false,
          changepw:false
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
        const {me,update,updateAvatar,changepw} = this.state;
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
                                <button type="button" onClick={()=>{this.setState({updateAvatar: !updateAvatar})}}>아바타변경</button>
                                <button type="button" onClick={()=>{this.setState({changepw: !changepw})}}>비밀번호변경</button>
                            </div>                          
                        </div>
                        {
                            update ? <UpdateMypage cookies={this.state.user} me={me}/> : <></>
                        }
                        {
                            updateAvatar ? <UpdateAvatar cookies={this.state.user}/> : <></>
                        }
                        {
                            changepw ? <ChangePW cookies={this.state.user}/> : <></>
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
        const {me}= this.props;
        this.state = {
            user : this.props.cookies,
            updatePW:false,
            msg:"",
            name: me.name,
            nickname: me.nickname
        }
    }

    

    onNameChangeHandler = (event)=>{
        this.setState({
            name : event.target.value
        })
    }
    onNickNameChangeHandler = (event)=>{
        this.setState({
            nickname : event.target.value
        })
    }

    updateUserProfile = (e)=>{
        e.preventDefault();
        const fd = new FormData();
        fd.append("name",e.target[0].value);
        fd.append("nickname",e.target[1].value);

        Axios.post("/user/changeProfile",fd,{
            headers:{
                "Cookies": this.state.user
            }
        }).then(res=>{
            if(res.status === 200){
                window.location.reload();
            }
        })
    }

    

    render(){
        const {updatePW,name,nickname} = this.state; 
        return(
            <div className="mypage_update">              
                <form onSubmit={this.updateUserProfile}>   
                    <input type="text" name="name" onChange={this.onNameChangeHandler} value={name}></input>
                    <input type="text" name="nickname" onChange={this.onNickNameChangeHandler} value={nickname}></input>
                    <input type="submit" value="수정"></input>
                </form>
                <button type="button" onClick={()=>{this.setState({updatePW:!updatePW})}}>비밀번호 변경</button> 
               
            </div>
        );
    }
}
class ChangePW extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            user : this.props.cookies,
        }
    }
    changePassword = (e)=>{
        e.preventDefault();
        const pwForm = {
            previousPassword : e.target[0].value,
            newPassword1 : e.target[1].value,
            newPassword2 : e.target[2].value
        }
        try{
            Axios.post("/user/passwordChange",pwForm,{
                headers:{
                    "Cookies" : this.state.user
                }
            }).then(res=>{
                console.log(res);
                if(res.status===200){
                    window.location.reload();                
            }}
            ).catch(error =>{
                alert("비밀번호 설정에 실패했습니다.");
            })
                
        }catch(error){
            console.log(error)
        }
    }
    render(){
        return(
            <>
            <div className="change-pw_wrap" >
                <form onSubmit={this.changePassword}>
                    <input type="password" name="previousPassword" placeholder="현재비밀번호를 입력해주세요" required></input>
                    <input type="password" name="newPassword1" placeholder="바꿀 비밀번호를 입력해주세요" required></input>
                    <input type="password" name="newPassword2" placeholder="비밀번호를 재 입력해주세요" required></input>
                    <input type="submit" value="비밀번호 변경"></input>
                </form>
            </div>
            </>
        );
    }

}
class UpdateAvatar extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            avatarPreviewUrl :"",
            user : this.props.cookies
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

    onChangeAvatarHandler = (e)=>{
        e.preventDefault();
        const fd = new FormData();
        fd.append("avatar",e.target[0].files[0]);

        Axios.post("/user/changeInfo",fd,{
            headers:{
                "Cookies" : this.state.user
            }
        }).then(res=>{
            if(res.status === 200){
                window.location.reload();
            }
        })
    }

    render(){
        const {avatarPreviewUrl} = this.state
        return(
            <>
            {
                    avatarPreviewUrl ? <img src={avatarPreviewUrl} alt="avatar preview"/> : ""
                }   
            <div className="mypage_update">
                <form onSubmit={this.onChangeAvatarHandler}>
                    <p>
                        <label for="avatar">avatar</label>
                        <input type="file" name="avatar" onChange={this.avatarPreview}></input>
                    </p>
                    <input type="submit" value="아바타 변경"/>
                </form>
            </div>
            </>
        );
    }
}


export default withCookies(Mypage);