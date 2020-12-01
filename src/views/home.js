import react from "react";
import {Header,Footer} from "../routes";
import axios from "axios";
import { Link} from 'react-router-dom';
export default class home extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            user : [],
            videos:[
            ],
        }
    }
    getVideos = async () =>{
        const videos = await axios({
            method:"get",
            url:"/api/videos/all"
        });
        this.setState({
            videos
        });
    }

    componentDidMount(){
        const {getVideos} = this;
        getVideos();
    }
    render(){
        const {videos} = this.state;
        console.log(videos);
        return(
        <>
            <Header/>
            <div className="home-videos__container">
                <div className="home-videos">
                    { videos.length === 0 ? 
                    <div className="non_videos">비디오가없습니다.</div> :
                    videos.map((videos)=>{
                        return(
                            <>
                            <div className="videos_wrap">
                                <Link to="/"  title={videos.title+"로 바로가기"}>
                                    <img src="/d" alt="?"/>
                                    <div className="videos_info" key={videos.id}>
                                        <div className="videos_title">{videos.title}</div>
                                        <div className="videos_name">by {videos.name}</div>
                                    </div>
                                </Link>
                            </div>
                            </>
                        );
                    }) 
                    } 
                    {
                        videos.length > (1 * 20) ?
                        <button type="button">더보기</button> :
                        <noscript>Video no longer exists</noscript>
                    }
                   
                </div>
            </div>
            <Footer/>
        </>
        );
    }
}