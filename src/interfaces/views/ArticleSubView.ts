import $ from 'jquery';

import { Article } from "../../domain/Article";

export class ArticleSubView {
    private _html: JQuery<HTMLElement> = 
    $(`
        <div class='articlelist__article'>
            <span class='articlelist__articleimage'></span>
            <h2 class='articlelist__articletitle'></h2>
            <p class='articlelist__articlecontent'></p>
            <p class='articlelist__releasedateandtime'></p>
        </div>
    `);

    get htmlElement(): JQuery<HTMLElement> {
        return this._html;
    }

    private _imageURL: string;
    private _title: string;
    private _content: string;

    private _issuedDate: string;
    private _issuedTime: string;

    constructor(article: Article) {
        this._imageURL = article.mainPictureUrl;
        this._title = article.title;
        this._content = article.content;

        this._issuedDate = `${article.dateIssuedDay}.${article.dateIssuedMonth}.${article.dateIssuedYear}`;
        this._issuedTime = `${article.dateIssuedHour}:${article.dateIssuedMinute}`;
    }
}