import { APIAuthService } from './APIAuthService';
import { Article } from '../../domain/Article';
import { ArticleConverter } from '../../utility/ArticleConverter';

export class APIService {
	private _apiAuth: APIAuthService;
	private _converter: ArticleConverter;
	private _baseURL: string =
		'https://sandbox-api.ipool.asideas.de/sandbox/api';
	private _baseSearchParameters: string =
		'/search?&types=article&publisher=welt&sortBy=LATEST&order=DESC';

	constructor(apiAuthService: APIAuthService) {
		if (apiAuthService.authorized) this._apiAuth = apiAuthService;
		else
			throw Error(
				'APIAuthService in APIServices constructor was not authorized yet.'
			);

		this._converter = new ArticleConverter();
	}

	public async getArticles(
		amount: number = 10,
		offset: number = 0,
		query: string = ''
	): Promise<Array<Article>> {
		try {
			//Input validaton
			if (!amount || amount < 0) {
				throw TypeError(
					'Amount cannot be 0 or lower, undefined, or null.'
				);
			} else if (offset === undefined || offset === null || offset < 0) {
				throw TypeError(
					'Offset cannot be lower than 0, undefined, or null.'
				);
			} else if (query === undefined || query === null) {
				throw TypeError('Query cannot be undefined or null');
			}

			let headers = new Headers();
			headers.set('Authorization', 'Basic ' + this._apiAuth.credentials);

			return await fetch(
				`${this._baseURL}${this._baseSearchParameters}&limit=${amount}&offset=${offset}&q=${query}`,
				{
					method: 'GET',
					headers: headers,
				}
			)
				.then((res) => res.json())
				.then((resJSON) => {
					let result: Array<Article> = new Array<Article>();

					for (
						let index = 0;
						index < Object.keys(resJSON['documents']).length;
						index++
					) {
						result.push(
							this._converter.convertJSONToArticle(
								resJSON['documents'][index]
							)
						);
					}

					return result;
				});
		} catch (err) {
			console.error(err);
			return new Array<Article>();
		}
	}
}
