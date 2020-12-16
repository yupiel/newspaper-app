import { Article } from '../../domain/Article';
import { APIService } from '../../infrastructure/api/APIService';

export default function execute(apiServices: APIService, amount: number = 10, offset: number = 0) : Promise<Array<Article>>{
    return apiServices.getArticles(amount, offset);
};
