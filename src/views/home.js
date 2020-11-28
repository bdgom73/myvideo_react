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
                {
                    title:"First Video!",
                    name:"Admin"
                }
            ]
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
        console.log(videos)
        return(
        <>
            <Header/>
            <div className="home-videos__container">
                <div className="home-videos">
                    {videos.map((videos)=>{
                        return(
                            <>
                            <div className="videos_wrap">
                                <Link to="/"  title={videos.title+"로 바로가기"}>
                                    <img src="#"/>
                                    <div className="videos_info">
                                        <div className="videos_title">{videos.title}</div>
                                        <div className="videos_name">by {videos.name}</div>
                                    </div>
                                </Link>
                            </div>
                            </>
                        );
                    })}
                </div>
            </div>
            <Footer/>
        </>
        );
    }
}