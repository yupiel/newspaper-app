import { APIService } from '../../infrastructure/orm/APIService';

export default async function execute(apiServices: APIService, query: string = ''): Promise<number> {
    let totalNumber: number;

    totalNumber = await apiServices.getTotalAmountOfArticles(query);

    return Math.ceil(totalNumber);
};

