
//Global Path
const HOME = "/";
const SEARCH = "/search";
const LOGIN = "/login";
const SIGNUP ="/signup";
const LOGOUT = "/logout";

const ME = "/me"; // User Path or Global Path

//Video Path
const VIDEO_DETAIL = "/video/:id";
const UPLOAD = "/video/upload";

//User Path
const USER_DETAIL = "/user/:id";

const path = {
    home : HOME,
    search : SEARCH,
    login : LOGIN,
    logout : LOGOUT,
    signup : SIGNUP,
    me :ME,
    video_detail : VIDEO_DETAIL,
    upload : UPLOAD,
    userDetail : USER_DETAIL
}

export default path;