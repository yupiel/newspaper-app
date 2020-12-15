import { APIAuthService } from './APIAuthService';

describe('APIAuthService', () => {
	let authService: APIAuthService;

	beforeEach(() => {
		authService = new APIAuthService();
	});

	test('APIAuthService is unauthorized by default', () => {
		expect(authService.authorized).toBeFalsy();
		expect(authService.credentials).toBeFalsy();
	});

	test('credentialsValid persists valid credentials', async () => {
		const fetchMock: any = jest.fn(() => Promise.resolve({ status: 200 }));
		global.fetch = fetchMock;

		let result = await authService.credentialsValid(
			'someUser',
			'somePassword'
		);

		expect(fetchMock).toHaveBeenCalled();

		expect(result).toBeTruthy();
		expect(authService.authorized).toBeTruthy();
		expect(authService.credentials).toBe('c29tZVVzZXI6c29tZVBhc3N3b3Jk');
	});

	test('credentialsValid handles invalid credentials', async () => {
		const fetchMock: any = jest.fn(() => Promise.resolve({ status: 403 }));
		global.fetch = fetchMock;

		let result = await authService.credentialsValid(
			'invalidUser',
			'invalidPassword'
		);

		expect(fetchMock).toHaveBeenCalled();

		expect(result).toBeFalsy();
		expect(authService.authorized).toBeFalsy();
		expect(authService.credentials).toBeFalsy();
	});

	test('credentialsValid tests credentials via BasicAuth header against statistics endpoint', async () => {
		const fetchMock: any = jest.fn(() => Promise.reject({ ok: false }));
		global.fetch = fetchMock;

		await authService.credentialsValid('someUser', 'somePassword');

		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringContaining('/statistics'),
			expect.objectContaining({
				headers: {
					Authorization: 'Basic c29tZVVzZXI6c29tZVBhc3N3b3Jk',
				},
			})
		);
	});

	test('credentialsValid catches network errors', async () => {
		const fetchMock = jest.fn(() => Promise.reject({ ok: false }));
		global.fetch = fetchMock;

		let result = await authService.credentialsValid(
			'someUser',
			'somePassword'
		);

		expect(fetchMock).toHaveBeenCalled();

		expect(result).toBeFalsy();
		expect(authService.authorized).toBeFalsy();
		expect(authService.credentials).toBeFalsy();
	});
});
