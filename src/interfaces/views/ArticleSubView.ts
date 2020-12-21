import $ from 'jquery';

import { Article } from '../../domain/Article';
import { TextUtility } from '../../utility/TextUtility';

export class ArticleSubView {
	private _html: JQuery<HTMLElement> = $(`
        <div class='articlelist__article'>
            <img class='articlelist__articleimage' src="" alt="">
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
		this._content = TextUtility.trimContentToLength(article.content, 100);

		this._articleURL = article.url;

		this._issuedDate = new Intl.DateTimeFormat(this._currentLocale, {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		}).format(article.dateIssued);
		this._issuedTime = new Intl.DateTimeFormat(this._currentLocale, {
			hour: 'numeric',
			minute: 'numeric',
		}).format(article.dateIssued);

		this.populateWithData();
		this.openArticleClickEvent();
	}

	private populateWithData(): void {
		$(this._html)
			.children('.articlelist__articleimage')
			.attr('src', this._imageURL);
		$(this._html)
			.children('.articlelist__articletext')
			.children('.articlelist__articletitle')
			.html(this._title);
		$(this._html)
			.children('.articlelist__articletext')
			.children('.articlelist__articlecontent')
			.html(this._content);
	}

	private openArticleClickEvent(): void {
		$(this._html).on('click', () => {
			window.location.href = this._articleURL;
		});
	}
}
