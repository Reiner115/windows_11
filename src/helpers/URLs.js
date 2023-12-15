export default class URLs {

    //static baseURL = "http://localhost:8000";
    //static baseURL = "https://localhost:9000";
    //static baseURL = "https://192.168.154.78:9000";
    //static baseURL = "http://mohamed-adam.com:3000";
    //static baseURL = "https://mohamed-adam.com:4000";
    //static baseURL = "http://mohamed-adam.com:3000/windows_11";

    //static baseURL = "http://windows11.mohamed-adam.com:3000";
    static baseURL = "";
    static STATE = this.baseURL+"/state";

    static CLUOD = this.baseURL+"/public/images/";

    static thumbnail = this.baseURL+"/public/thumbnail/";

    static UPLOAD = this.baseURL+"/upload";

    static LOGIN = this.baseURL+"/user/login";

    static SIGNUP = this.baseURL+"/user/signup";

    static CREATE_FOLDER = this.baseURL+"/actions/createFolder";

    static RENAME_FILE = this.baseURL+"/actions/rename";

    static DELETE_FILE = this.baseURL+"/actions/delete";

}