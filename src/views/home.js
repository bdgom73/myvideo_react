import react from "react";
import {Header,Footer} from "../routes";
import axios from "axios";
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
                            <div>{videos.title}</div>
                            <div>{videos.name}</div>
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