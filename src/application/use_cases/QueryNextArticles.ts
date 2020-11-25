import { Article } from '../../domain/Article';
import { APIService } from '../../infrastructure/orm/APIService';

export default function execute(apiServices: APIService, query: string, amount: number = 10, offset: number = 0) : Promise<Array<Article>>{
    return apiServices.queryNextArticles(query, amount, offset);
};

