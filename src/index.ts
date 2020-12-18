//Webpack Imports
import './index.css';

//Module imports
import $ from 'jquery';
import { APIAuthService } from './infrastructure/api/APIAuthService';
import { APIService } from './infrastructure/api/APIService';
import { ArticleController } from './interfaces/controllers/ArticleController';
import { ListView } from './interfaces/views/ListView';
import { LoginView } from './interfaces/views/LoginView';
import { SearchBarView } from './interfaces/views/SearchBarView';

let auth: APIAuthService = new APIAuthService();
let loginView: LoginView = new LoginView(auth);

let searchBar: SearchBarView = new SearchBarView();

$(document).on('loginSuccessEvent', () => {
	let service: APIService = new APIService(loginView.apiAuthService);
	let articleController: ArticleController = new ArticleController(service);

	let listView: ListView = new ListView(articleController);
	
	searchBar.initializeSearchBarView(listView);
	listView.updateArticlesBasedOnPage();
});
