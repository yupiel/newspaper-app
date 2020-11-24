import { APIService } from '../../infrastructure/orm/APIService';

export default async function execute(apiServices: APIService, query: string = ''): Promise<number> {
    let totalNumber: number;

    if (query)
        totalNumber = await apiServices.getTotalAmountOfArticles(query);
    else
        totalNumber = await apiServices.getTotalAmountOfArticles();

    return Math.ceil(totalNumber);
};

