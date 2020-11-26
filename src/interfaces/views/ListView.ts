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
    private _currentPage: number = 1;
    private _totalPages: number;

    private get currentOffset(): number {
        return (this._currentPage * this._articlesPerPage) - this._articlesPerPage;
    }

    constructor(articleController: ArticleController) {
        this._controller = articleController;

        this._navbar = $('.navbar');
        this._articles = new Array<ArticleSubView>();
        this._pagination = $('.pagination');
    }

    public async initialize(): Promise<void> {
        let retrievedArticles: Array<Article> = await this._controller.getNextArticles(this._articlesPerPage, this.currentOffset);
        this._totalPages = await this._controller.calculateTotalPages();

        for (let index = 0; index < retrievedArticles.length; index++) {
            this._articles.push(new ArticleSubView(retrievedArticles[index]));
            this.addArticleToHTMLList(this._articles[index]);
        }

        return Promise.resolve();
    }

    private async updatePagination(): Promise<void> {
        //TODO
    }

    //Helper Methods
    private addArticleToHTMLList(article: ArticleSubView): void {
        $('.articlelist').append(article.htmlElement);
    }
}