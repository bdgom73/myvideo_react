import react from "react";
import {Header,Footer} from "../../routes";
import axios from "axios";
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
class videoDetail extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props);
        this.state = {
            user : this.props.cookies.get("uid") || null ,
            title:"",
            desc:"",
            check:""
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
                    title:res.data.title,
                    desc:res.data.desc
                })
            })

       
    }
    getCheck = async ()=>{
        const {match} =this.props;
        const params = match.params;
        const formData = new FormData();

        formData.append("id",params.id)
        await axios.post("/user/check/"+params.id,formData,{
            headers:{
                "Cookies":this.state.user
            }
        }).then(res=>{
            this.setState({
                check:res.data
            })
        })
       
    }

    updateVideo = (event)=>{
        event.preventDefault();
        const {match} =this.props;
        const params = match.params;
        const formData = new FormData();

        const title = event.target[0].value;
        const desc = event.target[1].value;

        formData.append("id",params.id);
        formData.append("title",title);
        formData.append("desc",desc);

        axios.post("/videos/update",formData)
            .then(res=>{
                console.log(res);
                if(res.status === 200){
                    this.props.history.push(`/video/detail/${params.id}`)
                }else{
                    alert("업로드에 실패했습니다.")
                }
            })
    }

    onTitleChangeHandler = (event)=>{
        this.setState({
            title : event.target.value
        })
    }
    onDescChangeHandler = (event)=>{
        this.setState({
            desc : event.target.value
        })
    }
    componentDidMount(){
        this.getVideos();
        this.getCheck();
    }
    render(){
        const {desc,title,check} = this.state;
        if(check === true){
            return(
                <>
                    <Header/>
                    <div className="update-video_wrap">
                        <span className="update-title">UPDATE VIDEO</span>
                        <div className="update-video">
                            <form onSubmit={this.updateVideo} method="post">
                                <label for="title">Title</label>
                                <input type="text" name="title" value={title} onChange={this.onTitleChangeHandler} ></input>
                                <label for="desc">Description</label>
                                <textarea type="text" name="desc" value={desc} onChange={this.onDescChangeHandler}></textarea>
                                <input type="submit" value="update"></input>
                            </form>
                        </div>
                    </div>
                    <Footer/>
                </>
                 );
        }else if(check === false){
           return (<>
               {this.props.history.push("/")}
               </>
               )
        }else{
            return(
                <>2</>
            )
        }
    }
        
    
   
}
export default withCookies(videoDetail)