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
        const {location} = this.props
        const query = quertString.parse(location.search);
        const videos = await axios({
            method:"get",
            url:"/api/videos/"+ query.q
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
        const query = quertString.parse(this.props.location.search);
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