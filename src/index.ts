//Webpack Imports
const css = require('./index.css');

//Module imports
import { APIAuthService } from "./infrastructure/orm/APIAuthService";
import { APIService } from "./infrastructure/orm/APIService";
import { ArticleController } from "./interfaces/controllers/ArticleController";
import { ListView } from "./interfaces/views/ListView";

let auth: APIAuthService = new APIAuthService();
await auth.credentialsValid('', '');   //TODO: Add credentials/login service


let service: APIService = new APIService(auth);
let articleController: ArticleController = new ArticleController(service);

let listView: ListView = new ListView(articleController);
listView.updateArticlesBasedOnPage();

console.log('index finished')