import react from "react";

export default class socialLogin extends react.Component{
    render(){
        return(
            <div className="social__wrap">
                <div className="social">
                    <button type="button" className="naver">Naver</button>
                    <button type="button" className="fb">Facebook</button>
                </div>
               
            </div>
        );
    }
}