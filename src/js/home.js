import { loadHeaderFooter } from "./utils.mjs";
import Auth from "./Auth.mjs";

loadHeaderFooter();
const authenitication = new Auth(".overlay");
authenitication.checkAuth()