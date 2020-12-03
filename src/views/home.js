import react from "react";
import {Header,Footer} from "../routes";
import axios from "axios";
import { Link} from 'react-router-dom';
export default class home extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            user : [],
            videos: [],
            page:0,
            itemCount :20
        }
    }
    getVideos = async () =>{
        const videos = await axios({
            method:"get",
            url:"/videos/all"
        });
        
        const a = typeof(videos.data);
        console.log(a);
        console.log(videos.data.content);
        this.setState({
            videos : videos.data.content
        })
    }

    handleNextPage = ()=>{
        this.setState({
            page : this.state.page + 1,
            itemCount : this.state.itemCount + 20
        })
    }

    componentDidMount(){
        const {getVideos} = this;
        getVideos();
    }
    render(){
        const {videos, page, itemCount} = this.state;
        return(
        <>
            <Header/>
            <div className="home-videos__container">
                <div className="home-videos">
                    { videos.length >= 1 ? 
                    videos.map((videos)=>{
                        return(
                            <>
                            <div className="videos_wrap">
                                <Link to={`/video/detail/${videos}`} title={videos.title+"로 바로가기"}>
                                    <video src={videos.videoUrl} alt="?"/>
                                    <div className="videos_info" key={videos.id}>
                                        <div className="videos_title">{videos.title}</div>
                                        <div className="videos_name">by {videos.name}</div>
                                    </div>
                                </Link>
                            </div>
                            </>
                        );
                    }) : <div className="non_videos">비디오가없습니다.</div> 
                    } 
                    {
                        videos.length > (page+1 * itemCount) ?  
                        <button type="button" onClick={this.handleNextPage}>더보기</button> :
                        <noscript>Video no longer exists</noscript>
                    }
                   
                </div>
            </div>
            <Footer/>
        </>
        );
    }
}