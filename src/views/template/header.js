import react from "react";
import { Link } from 'react-router-dom';
import {NonLogin,IsLogin} from "../../routes";
import { instanceOf } from 'prop-types';
import { Cookies,withCookies } from 'react-cookie';
class Header extends react.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props);
        const {cookies} = props
        this.state={
            user : cookies.get("uid") || null
        } 
    }
    
    render(){
        const {user} = this.state;
        return(
            <header>
                <div className="header_wrap">
                    <span className="header_logo">
                        <Link to="/">ROFL</Link>
                        <span className="header_logo_mini">
                            🎄Rolling On Floor Laughing 
                        </span>
                    </span>
                    <form className="search" action="/search">
                        <input type="text" name="q" placeholder="검색어를 입력해주세요"></input>
                    </form>
                    {user ?  <IsLogin/> : <NonLogin/>}
                </div>
            </header>
        );
    }
}
export default withCookies(Header)