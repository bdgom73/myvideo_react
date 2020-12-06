import Axios from "axios";
import react from "react";
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";
class upload extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        const {cookies} = props
        this.state = {
           user : cookies.get("uid"),
           videoPreviewUrl:"",
           display:{
               display:"none"
           },
          
        };
    }
    videoPreview = (e)=>{
        e.preventDefault();

        try{
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.readAsDataURL(file);
            reader.onloadend = () => {
            this.setState({  
                videoPreviewUrl: reader.result ,
                display:{display:"block"}
            });
            
            }
        }catch(error){
            console.log(error)
        }
        
    }

    sendVideo = (event)=>{
        event.preventDefault();
        const desc = document.getElementById("desc");
        const fileInfo = new FormData();
       
        const file = event.target[0].files[0];
        const title = event.target[1].value;
        const descText = desc.innerText;
        fileInfo.append("file",file);
        fileInfo.append("title",title);
        fileInfo.append("desc",descText)
        Axios.post("/video/upload",fileInfo,{
            headers:{
                "Cookies" : this.state.user
            }
        }).then(res=>{
                console.log(res)
                const id = res.data;
                if(res.data !== "error" || res.data !== "fail"){
                    this.props.history.push(`/video/detail/${id}`)
                }else{
                    alert("업로드에 실패했습니다.")
                }
            })
    }
  

    render(){
        const {videoPreviewUrl,display} = this.state;
        return(
            <div className="upload__wrap">
                <div className="upload">
                    {
                        videoPreviewUrl ?  <video src={videoPreviewUrl} controls/> : <></>
                    }
                   
                    <form onSubmit={this.sendVideo}>
                        <input type="file" required name="video" id="videoFile" onChange={this.videoPreview}></input>
                        <input type="text" placeholder="제목을 입력해주세요" name="title" required></input>
                        <div contentEditable placeholder="글을 입력해주세요" style={{width:"100%",height:"100px"}} id="desc"></div>
                        <input type="submit" value="글쓰기"></input>
                    </form>
                </div>
               
            </div>
        );
    }
}
export default withCookies(upload)