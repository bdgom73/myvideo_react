// template
export {default as Header} from "./views/template/header";
export {default as Footer} from "./views/template/footer";
export {default as Social} from "./views/template/sociallogin";
export { nonLogin as NonLogin, isLogin as IsLogin} from "./views/template/login";

//page
export {default as Login} from "./views/page/login";
export {default as Signup} from "./views/page/signup";
export {default as Mypage} from "./views/page/mypage";
export {default as Upload} from "./views/page/upload";
export {default as Search} from "./views/page/search";
//home
export {default as Home} from "./views/home";

//auth
export {default as PrivateRouter} from "./views/auth/privateRouter"
export {default as PubilcRouter} from "./views/auth/publicRouter"
export {default as Logout} from "./views/auth/logout"