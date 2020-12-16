//Webpack Imports
import './index.css';

//Module imports
import $ from 'jquery';
import { APIAuthService } from './infrastructure/api/APIAuthService';
import { APIService } from './infrastructure/api/APIService';
import { ArticleController } from './interfaces/controllers/ArticleController';
import { ListView } from './interfaces/views/ListView';
import { LoginView } from './interfaces/views/LoginView';

let auth: APIAuthService = new APIAuthService();
let loginView: LoginView = new LoginView(auth);

$(document).on('loginSuccessEvent', () => {
	let service: APIService = new APIService(loginView.apiAuthService);
	let articleController: ArticleController = new ArticleController(service);

	let listView: ListView = new ListView(articleController);
	listView.updateArticlesBasedOnPage();
});
