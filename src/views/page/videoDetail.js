import react from "react";
import {Header,Footer} from "../../routes";
import axios from "axios";
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";
class videoDetail extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        this.state = {
            user : this.props.cookies.get("uid") || null ,
            videos:"",
            xid:"",
            yid:""
        }
    }
    getVideos = async () =>{
        const {match} =this.props;
        const params = match.params;
        const formData = new FormData();

        formData.append("id",params.id)
        await axios.post(`/video/detail/${params.id}`,formData)
            .then(res=>{
                this.setState({
                    videos : res.data
                })
            })
        await axios.get("/user/send/id",{
            headers:{
                "Cookies" : this.state.user
            }
        })
            .then(res=>{
                this.setState({
                    xid:res.data
                })
            })
        await axios.post("/user/send/videoUserid/"+params.id,formData)
            .then(res=>{
                this.setState({
                    yid:res.data
                })
            })
       }

    deleteVideo = ()=>{
        const {match} =this.props;
        const params = match.params;
        const formData = new FormData();

        formData.append("id",params.id)

        if(window.confirm("정말로 삭제하시겠습니까?")){
            axios.post(`/video/delete/${params.id}`,formData)
            .then(res=>{
                    this.props.history.push("/");
            })
        }
      
    }
    
    componentDidMount(){
        const {getVideos} = this;
        getVideos();
       
    }
   
    render(){
        const {videos,xid,yid} = this.state;
        console.log(xid, yid)
        return(
            <>
                <Header/>
                <div className="video-view__wrap">
                    <div className="video_view">
                        <video src={videos.videoUrl} controls/>
                        <div className="video_view-header">
                            <span className="video_view-title">{videos.title}</span>
                            <span className="video_view-date">{videos.date}</span>  
                        </div>
                        <span className="video_view-name"><span className="byname">Posting by</span><span className="name">{videos.name}</span></span>
                        <div className="video_view-descWrap">
                            <pre className="video_view-desc">{videos.desc}</pre> 
                        </div>
                    </div>
                    <div className="updateBtn">
                    {
                        xid === yid && xid !=="" && yid !== "" ? (
                        <>
                        <button type="button" onClick={()=> {
                          this.props.history.push(`/video/update/${this.props.match.params.id}`)
                        }}>수정</button>
                        <button type="button" onClick={this.deleteVideo}>삭제</button>
                        </>
                        ) : (<></>)
                    }  
                    </div>
                      
                </div>
                <Footer/>
            </>
         );
    }
   
}
export default withCookies(videoDetail)