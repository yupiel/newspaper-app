import { APIAuthService } from "./APIAuthService";
import { Article } from "../../domain/Article";
import { ArticleConverter } from "./ArticleConverter";

export class APIService {
    private _apiAuth: APIAuthService;
    private _converter: ArticleConverter;
    private _baseURL: string = 'https://sandbox-api.ipool.asideas.de/sandbox/api';

    constructor(apiAuthService: APIAuthService) {
        if(apiAuthService.authorized)
            this._apiAuth = apiAuthService;
        else
            throw Error('APIAuthService in APIServices constructor was not authorized yet.')
        
            this._converter = new ArticleConverter();
    }

    public async getNextArticles(amount: number = 10, offset: number = 0): Promise<Array<Article>> {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + this._apiAuth.credentials);

        return await fetch(`${this._baseURL}/search?&types=article&publisher=welt&offset=${offset}&limit=${amount}`, {
            method: 'GET',
            headers: headers
        })
            .then(async res => {
                let result : Array<Article> = new Array<Article>();
                let resultJSON = await res.json();

                for(let index = 0; index < amount; index++){
                    result.push(this._converter.convertJSONToArticle(resultJSON['documents'][index]));
                }

                return result;
            })
            .catch(err => {
                console.error(err);
                return new Array<Article>();
            });
    }

    public async queryNextArticles(query: string, amount: number = 10, offset: number = 0): Promise<Array<Article>> {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + this._apiAuth.credentials);

        return await fetch(`${this._baseURL}/search?q=${query}&types=article&publisher=welt&offset=${offset}&limit=${amount}`, {
            method: 'GET',
            headers: headers
        })
            .then(async res => {
                let result : Array<Article> = new Array<Article>();
                let resultJSON = await res.json();

                for(let index = 0; index < amount; index++){
                    result.push(this._converter.convertJSONToArticle(resultJSON['documents'][index]));
                }

                return result;
            })
            .catch(err => {
                console.error(err);
                return new Array<Article>();
            });
    }
}