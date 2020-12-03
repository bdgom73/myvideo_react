import react from "react";
import {Header,Footer} from "../../routes";
import axios from "axios";
import {Link} from 'react-router-dom';
export default class videoDetail extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            user : [],
            videos:""
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
                    <video src={videos.videoUrl} controls/>
                    <span>{videos.title}</span>
                    <span>{videos.desc}</span>
                    <span>{videos.date}</span>
                </div>
            </div>
            <Footer/>
        </>
        );
    }
}