import { APIAuthService } from "./APIAuthService";
import { Article } from "../../domain/Article";
import { ArticleConverter } from "./ArticleConverter";

export class APIService {
    private _apiAuth: APIAuthService;
    private _converter: ArticleConverter;
    private _baseURL: string = 'https://sandbox-api.ipool.asideas.de/sandbox/api';
    private _baseSearchParameters: string = '/search?&types=article&publisher=welt&sortBy=LATEST&order=DESC';

    constructor(apiAuthService: APIAuthService) {
        if (apiAuthService.authorized)
            this._apiAuth = apiAuthService;
        else
            throw Error('APIAuthService in APIServices constructor was not authorized yet.')

        this._converter = new ArticleConverter();
    }

    public async getArticles(amount: number = 10, offset: number = 0, query: string = ''): Promise<Array<Article>> {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + this._apiAuth.credentials);

        return await fetch(`${this._baseURL}${this._baseSearchParameters}&limit=${amount}&offset=${offset}&q=${query}`, {
            method: 'GET',
            headers: headers
        })
            .then(res => res.json())
            .then(resJSON => {
                let result: Array<Article> = new Array<Article>();

                for (let index = 0; index < Object.keys(resJSON['documents']).length; index++) {
                    result.push(this._converter.convertJSONToArticle(resJSON['documents'][index]));
                }

                return result;
            })
            .catch(err => {
                console.error(err);
                return new Array<Article>();
            });
    }

    public async getTotalAmountOfArticles(query: string = ''): Promise<number> {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + this._apiAuth.credentials);

        return await fetch(`${this._baseURL}${this._baseSearchParameters}q=${query}`, {
            method: 'GET',
            headers: headers
        })
            .then(res => res.json())
            .then(resJSON => resJSON['pagination']['total'])
            .catch(err => {
                console.error(err);
                return 0;
            });
    }
}