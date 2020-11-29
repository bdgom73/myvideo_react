import react from "react";
import { Link } from 'react-router-dom';

export class nonLogin extends react.Component{
    render(){
        return(
            <>
              <div>
                    <ul>
                        <li><Link to="/login">Log-in</Link></li>
                        <li><Link to="/signup">Sign-up</Link></li>
                    </ul>
                </div>
            </>
        );
    }
}

export class isLogin extends react.Component{

    

    render(){
        return(
            <>
              <div>
                    <ul>
                        <li><Link to="/me">Mypage</Link></li>
                        <li><Link to="/video/upload">upload</Link></li>
                        <li><Link to="/logout">logout</Link></li>
                    </ul>
                </div>
            </>
        );
    }
}

