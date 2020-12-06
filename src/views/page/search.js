import react from "react";
import {Header,Footer} from "../../routes";
import axios from "axios";
import { Link} from 'react-router-dom';
import quertString from "query-string";
export default class home extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            user : [],
            videos: []
        }
    }
    getVideos = async () =>{
        const {location} = this.props
        const query = quertString.parse(location.search);
        const formData = new FormData();
        formData.append("query",query.q);
        await axios({
            method:"POST",
            url:"/video/search/"+ query.q,
            data : formData
        }).then(res=>{
           this.setState({
               videos : res.data.content
           })
        })
     
    }

    componentDidMount(){
        const {getVideos} = this;
        getVideos();
    }
    render(){
        const {location} = this.props
        const {videos} = this.state;
        const query = quertString.parse(location.search);
        return(
        <>
            <Header/>
            <div className="home-videos__container">
                <span>SEARCHING BY {query.q}</span>
                <div className="home-videos">   
                    {videos.map((videos)=>{
                        return(
                            <>
                            <div className="videos_wrap">
                            <Link to={`/video/detail/${videos.id}`} title={videos.title+"로 바로가기"}>
                                    <video src={videos.videoUrl} alt="?"/>
                                    <div className="videos_info" key={videos.id}>
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