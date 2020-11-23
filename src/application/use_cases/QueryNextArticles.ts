import { Article } from '../../domain/Article'
import { APIServices } from '../../infrastructure/orm/APIServices'

export default async function execute(apiServices: APIServices, query: string, offset: number = 0) : Promise<Array<Article>>{
    return await apiServices.queryNextTenArticles(query, offset);
};

