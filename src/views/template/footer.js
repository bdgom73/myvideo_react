import react from "react";
export default class footer extends react.Component{
    render(){
        return(
            <footer>
                <div className="footer_wrap">
                    <span className="header_logo">
                        <a href="/">ROFL</a>
                        <span className="header_logo_mini">
                            🎄Rolling On Floor Laughing 
                        </span>
                    </span>
                    <div className="copylight">&copy;ROFL/KIJ</div>
                </div>    
            </footer>
        );
    }
}