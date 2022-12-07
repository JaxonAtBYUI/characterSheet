import Auth from "./Authcopy.mjs";


function action() {
    console.log("Hello World!")
}

register = new Auth(action);
register.showLogin();