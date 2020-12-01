import react from "react";
import {Header,Footer} from "../../routes";
import axios from "axios";
import {Link} from 'react-router-dom';
export default class videoDetail extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            user : [],
            videos:[
                {
                    title:"First Video!",
                    name:"Admin",
                    id:"1"
                }
            ]
        }
    }
    getVideos = async () =>{
        const {match} =this.props;
        const params = match.params;
        
        await axios.get("/video/findone",{data: params.id})
            .then(res=>{
                this.setState({
                    videos : res.data
                })
            })

    }


    componentDidMount(){
        const {getVideos} = this;
        getVideos();

    }
    render(){
        const {videos} = this.state;
        return(
        <>
            <Header/>
            <div className="video-view__wrap">
                <div className="video_view">
                    {videos.map((videos)=>{
                        return(
                            <>
                            <div className="find-video"  key={videos.id} >
                                <Link to="/"  title={videos.title+"로 바로가기"}>
                                    <div className="find-video__main">
                                        <div className="find-video_title">{videos.title}</div>
                                        <div className="find-video_name">by {videos.name}</div>
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