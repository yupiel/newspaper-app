import { Article } from '../../domain/Article'
import { APIService } from '../../infrastructure/orm/APIService'

export default async function execute(apiServices: APIService, query: string, amount: number = 10, offset: number = 0) : Promise<Array<Article>>{
    return await apiServices.queryNextArticles(query, amount, offset);
};

