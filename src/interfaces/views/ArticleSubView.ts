import $ from 'jquery';

import { Article } from "../../domain/Article";

export class ArticleSubView {
    private _html: JQuery<HTMLElement> =
        $(`
        <div class='articlelist__article'>
            <img class='articlelist__articleimage'>
            <div class='articlelist__articletext'>
                <h2 class='articlelist__articletitle'></h2>
                <p class='articlelist__articlecontent'></p>
                <p class='articlelist__releasedateandtime'></p>
            </div>
        </div>
        `);

    get htmlElement(): JQuery<HTMLElement> {
        return this._html;
    }

    private _imageURL: string;
    private _title: string;
    private _content: string;

    private _articleURL: string;

    private _currentLocale: string = 'de-DE';
    private _issuedDate: string;
    private _issuedTime: string;

    constructor(article: Article) {
        this._imageURL = article.mainPictureUrl;
        this._title = article.title;
        this._content = this.trimContentToLength(article.content, 100);

        this._articleURL = article.url;

        let articleDate: string[] = article.dateIssued.toLocaleString(this._currentLocale).split(', ');
        this._issuedDate = articleDate[0];
        this._issuedTime = articleDate[1].slice(0, -3); //Remove seconds with slice

        this.populateWithData();
        this.openArticleClickEvent();
    }

    private populateWithData(): void {
        $(this._html).children('.articlelist__articleimage').attr('src', this._imageURL);
        $(this._html).children('.articlelist__articletext').children('.articlelist__articletitle').html(this._title);
        $(this._html).children('.articlelist__articletext').children('.articlelist__articlecontent').html(this._content);
    }

    private trimContentToLength(content: string, maxCharacters: number = 100): string {
        if (content === undefined) return '';

        try {
            console.log(content);
            console.log(`Content length: ${content.length}`)

            let teaser: string = '';

            if (content.length > maxCharacters - 3) {
                let contentWords: Array<string> = content.split(' ');

                while (teaser.length < maxCharacters - 3) {
                    let currentWord = contentWords.shift();

                    if (teaser.length + currentWord.length < maxCharacters - 3) {
                        teaser += currentWord + ' ';
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                teaser = content;
            }

            if (teaser.endsWith('.'))
                teaser += '..';
            else
                teaser += '...';

            return teaser;
        }
        catch (e) {
            console.error(e);

            return content;
        }
    }
    private openArticleClickEvent(): void{
        $(this._html).on('click', () => {
            window.location.href = this._articleURL;
        })
    }
}