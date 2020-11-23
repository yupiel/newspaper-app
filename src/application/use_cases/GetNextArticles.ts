import { Article } from '../../domain/Article'
import { APIServices } from '../../infrastructure/orm/APIServices'

export default async function execute(apiServices: APIServices, offset: number = 0) : Promise<Array<Article>>{
    return await apiServices.getNextTenArticles(offset);
};

