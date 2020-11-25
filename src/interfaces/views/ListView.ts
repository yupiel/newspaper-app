import $ from 'jquery';

import { Article } from "../../domain/Article";
import { ArticleController } from "../controllers/ArticleController";
import { ArticleSubView } from "./ArticleSubView";


export class ListView {
    private _controller: ArticleController;

    private _navbar: JQuery<HTMLElement>;

    private _articles: Array<ArticleSubView>;
    private _articlesPerPage: number = 10;

    private _pagination: JQuery<HTMLElement>;

    constructor(articleController: ArticleController) {
        this._controller = articleController;

        this._navbar = $('.navbar');
        this._articles = new Array<ArticleSubView>();
        this._pagination = $('.pagination');
    }

    public async initialize() {
        let retrievedArticles: Array<Article> = await this._controller.getNextArticles(this._articlesPerPage);

        for (let index = 0; index < retrievedArticles.length; index++) {
            this._articles.push(new ArticleSubView(retrievedArticles[index]));
            this.addArticleToHTMLList(this._articles[index]);
        }

        return Promise.resolve();
    }

    private addArticleToHTMLList(article: ArticleSubView) {
        $('.articlelist').append(article.htmlElement);
    }
}