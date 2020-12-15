import $ from 'jquery';

import { Article } from '../../domain/Article';
import { ArticleController } from '../controllers/ArticleController';
import { ArticleSubView } from './ArticleSubView';

export class ListView {
	private _controller: ArticleController;

	private _navbar: JQuery<HTMLElement>;
	private _currentQuery: string = '';

	private _articlelist: JQuery<HTMLElement>;
	private _articles: Array<ArticleSubView>;
	private _articlesPerPage: number = 10;

	private _currentPage: number = 1;
	private _currentScrollHeight: number = 0;
	private _pageBottomScrollOffset: number = 300;

	private get currentOffset(): number {
		return (
			this._currentPage * this._articlesPerPage - this._articlesPerPage
		);
	}

	constructor(articleController: ArticleController) {
		this._controller = articleController;

		this._navbar = $('.navbar');
		this._articlelist = $('.articlelist');
		this._articles = new Array<ArticleSubView>();

		this.addInfiniteScrollingEvent();
	}

	public updateArticlesBasedOnPage(query: string = ''): void {
		let retrievedArticles: Promise<Array<Article>>;

		if (!query)
			retrievedArticles = this._controller.getNextArticles(
				this._articlesPerPage,
				this.currentOffset
			);
		else
			retrievedArticles = this._controller.queryNextArticles(
				query,
				this._articlesPerPage,
				this.currentOffset
			);

		retrievedArticles.then((articles: Array<Article>) => {
			for (let index = 0; index < articles.length; index++) {
				this._articles.push(new ArticleSubView(articles[index]));
				this._articlelist.append(
					this._articles[this.currentOffset + index].htmlElement
				);
			}
		});
	}

	private addInfiniteScrollingEvent(): void {
		$(window).on('scroll', () => {
			const scrollHeight: number = $(document).height()!;
			const scrollPos: number = Math.floor(
				$(window).height()! + $(window).scrollTop()!
			);
			const isBottom: boolean =
				scrollHeight - this._pageBottomScrollOffset < scrollPos;

			if (isBottom && this._currentScrollHeight < scrollHeight) {
				this._currentPage++;
				this.updateArticlesBasedOnPage(this._currentQuery);

				this._currentScrollHeight = scrollHeight;
			}
		});
	}
}
