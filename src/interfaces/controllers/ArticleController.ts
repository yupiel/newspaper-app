import { APIService } from '../../infrastructure/orm/APIService';
import { Article } from '../../domain/Article';

import GetNextArticles from '../../application/use_cases/GetNextArticles';
import QueryNextArticles from '../../application/use_cases/QueryNextArticles';
import GetTotalPages from '../../application/use_cases/GetTotalPages';

export class ArticleController {
    private _apiService: APIService;

    private _lastQuery: string;

    constructor(apiService: APIService) {
        this._apiService = apiService;

        this._lastQuery = '';
    }

    public async calculateTotalPages(): Promise<number> {
        return await GetTotalPages(this._apiService, this._lastQuery);
    }

    public async getNextArticles(amount: number, offset: number = 0): Promise<Array<Article>> {
        return await GetNextArticles(this._apiService, amount, offset);
    }

    public async queryNextArticles(query: string, amount: number, offset: number = 0): Promise<Array<Article>> {
        this._lastQuery = query;
        return await QueryNextArticles(this._apiService, query, amount, offset);
    }

}
