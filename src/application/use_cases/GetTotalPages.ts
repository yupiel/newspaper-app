import { APIService } from '../../infrastructure/orm/APIService';

export default async function execute(apiServices: APIService, query: string = ''): Promise<number> {
    let totalNumber: number;

    if (query)
        totalNumber = await this._apiService.getTotalAmountOfArticles(query);
    else
        totalNumber = await this._apiService.getTotalAmountOfArticles();

    return Math.ceil(totalNumber);
};

