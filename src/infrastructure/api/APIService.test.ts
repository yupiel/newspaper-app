import { APIAuthService } from './APIAuthService';
import { APIService } from './APIService';
jest.mock('./APIAuthService');

describe('APIService', () => {
	let apiService: APIService;

	beforeAll(() => {
		//@ts-ignore
		APIAuthService.authorized = true;
		//@ts-ignore
		apiService = new APIService(APIAuthService);
	});

	test('getArticles catches network errors', async () => {
		const fetchMock: any = jest.fn(() => Promise.reject({ ok: false }));
		global.fetch = fetchMock;

		await apiService.getArticles();

		expect(fetchMock).toHaveBeenCalled();
	});

	test('getArticles returns article objects for all found articles', async () => {
		const mockSuccessResponseBody = {
			documents: [
				{
					id: 'id',
					language: 'language',
					dateIssued: '2020-10-02',
					url: 'www.url.com',
					content: 'content',
					title: 'title',
					pictureReferences: [
						{
							originalImage: {
								url: 'www.originalImageUrl.com',
							},
						},
					],
				},
				{
					id: 'id2',
					language: 'language2',
					dateIssued: '2020-10-03',
					url: 'www.url2.com',
					content: 'content2',
					title: 'title2',
					pictureReferences: [
						{
							originalImage: {
								url: 'www.originalImageUrl2.com',
							},
						},
					],
				},
			],
		};
		const fetchMock: any = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(mockSuccessResponseBody),
			})
		);
		global.fetch = fetchMock;

		let result = await apiService.getArticles();

		expect(fetchMock).toHaveBeenCalled();

		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(2);
	});

	test('getArticles returns empty array if no Articles were found', async () => {
		const fetchMock: any = jest.fn(() => Promise.resolve({ status: 200 }));
		global.fetch = fetchMock;

		let result = await apiService.getArticles();

		expect(fetchMock).toHaveBeenCalled();

		expect(result).toEqual([]);
	});

	test('getArticles handles negative amount parameter', async () => {
		const fetchMock: any = jest.fn(() => Promise.resolve({ status: 200 }));
		global.fetch = fetchMock;

		let amount = -20;
		let offset = 0;
		let query = '';

		await apiService.getArticles(amount, offset, query);

		expect(fetchMock).toBeCalledTimes(0);
	});

	test('getArticles handles negative offset parameter', async () => {
		const fetchMock: jest.FunctionLike = jest.fn(() =>
			Promise.resolve({ status: 200 })
		);
		//@ts-ignore
		global.fetch = fetchMock;

		let amount = 10;
		let offset = -20;
		let query = '';

		await apiService.getArticles(amount, offset, query);

		expect(fetchMock).toBeCalledTimes(0);
	});

	test('getArticles returns empty array on null|undefined amount', async () => {
		const fetchMock: jest.FunctionLike = jest.fn(() =>
			Promise.resolve({ status: 200 })
		);
		//@ts-ignore
		global.fetch = fetchMock;

		let amount: undefined | null;
		let offset = 0;
		let query = '';

		amount = null;
		//@ts-ignore
		expect(await apiService.getArticles(amount, offset, query)).toEqual([]);
		amount = undefined;
		//@ts-ignore
		expect(await apiService.getArticles(amount, offset, query)).toEqual([]);
	});

	test('getArticles returns empty array on null|undefined offset', async () => {
		const fetchMock: jest.FunctionLike = jest.fn(() =>
			Promise.resolve({ status: 200 })
		);
		//@ts-ignore
		global.fetch = fetchMock;

		let amount = 10;
		let offset: undefined | null;
		let query = '';

		offset = null;
		//@ts-ignore
		expect(await apiService.getArticles(amount, offset, query)).toEqual([]);
		offset = undefined;
		//@ts-ignore
		expect(await apiService.getArticles(amount, offset, query)).toEqual([]);
	});

	test('getArticles returns empty array on null|undefined query', async () => {
		const fetchMock: jest.FunctionLike = jest.fn(() =>
			Promise.resolve({ status: 200 })
		);
		//@ts-ignore
		global.fetch = fetchMock;

		let amount = 10;
		let offset = 0;
		let query: undefined | null;

		query = null;
		//@ts-ignore
		expect(await apiService.getArticles(amount, offset, query)).toEqual([]);
		query = undefined;
		//@ts-ignore
		expect(await apiService.getArticles(amount, offset, query)).toEqual([]);
	});
});
