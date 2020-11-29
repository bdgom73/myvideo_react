import Axios from "axios";
import react from "react";

class upload extends react.Component{
    constructor(props){
        super(props);
        this.state = {
          
        };
    }


    sendVideo = (event)=>{
        event.preventDefault();

    }

    render(){
        return(
            <div className="upload__wrap">
                <div className="upload">
                    <form>
                        <input type="file" required name="video" id="videoFile"></input>
                        <input type="text" placeholder="제목을 입력해주세요" name="title"></input>
                        <div contentEditable placeholder="글을 입력해주세요" style={{width:"100%",height:"100px"}}></div>
                        <input type="submit" value="글쓰기"></input>
                    </form>
                </div>
               
            </div>
        );
    }
}
export default upload