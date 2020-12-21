import { TextUtility } from './TextUtility';

describe('TextUtility', () => {
	test('trimContentToLength returns empty string on null|undefined|empty', () => {
		//@ts-ignore
		expect(TextUtility.trimContentToLength(null)).toEqual('');
		//@ts-ignore
		expect(TextUtility.trimContentToLength(undefined)).toEqual('');
		expect(TextUtility.trimContentToLength('')).toEqual('');
	});

	test('trimContentToLength returns empty string when limit is 0', () => {
		let limit = 0;
		let content = 'Content';

		expect(content.length).toBeGreaterThan(limit);
		expect(TextUtility.trimContentToLength(content, limit)).toEqual('');
	});

	test('trimContentToLength returns empty on contiguous content', () => {
		let limit = 6;
		let content = 'contentisking';

		expect(content.length).toBeGreaterThan(limit);
		expect(TextUtility.trimContentToLength(content, limit)).toEqual('');
	});

	test('trimContentToLength returns original content when beneath limit', () => {
		let limit = 100;
		let content = 'Content under 100 characters.';

		expect(content.length).toBeLessThanOrEqual(limit);
		expect(TextUtility.trimContentToLength(content, limit)).toEqual(
			content
		);
	});

	test('trimContentToLength returns trimmed content with whole words and 3 trailing dots when above limit', () => {
		let limit = 20;
		let content = 'Sooo much content here.';

		expect(content.length).toBeGreaterThan(limit);
		expect(TextUtility.trimContentToLength(content, limit)).toEqual(
			'Sooo much ...'
		);
	});

	test('trimContentToLength returns trimmed content with no more than 3 trailing dots when above limit', () => {
		let limit = 30;
		let content =
			'Content....With a lot..... of dots.........................';

		expect(content.length).toBeGreaterThan(limit);
		expect(TextUtility.trimContentToLength(content, limit)).toStrictEqual(
			'Content....With a lot ...'
		);
	});

	test('ellipsizeText returns empty string on null|undefined|empty', () => {
		//@ts-ignore
		expect(TextUtility.ellipsizeText(null)).toEqual('');
		//@ts-ignore
		expect(TextUtility.ellipsizeText(undefined)).toEqual('');
		expect(TextUtility.ellipsizeText('')).toEqual('');
	});

	test('ellipsizeText returns string with exactly 3 trailing dots', () => {
		let text: string =
			'this is..... a long text.... with a bunch of dots.........';
		let otherText: string =
			'this is another text with exactly one dot at the end.';
		let weirdText: string =
			'whoever wrote this in an article needs to be fired text .:.. .:..:.: .. . ... .@.. .. .. ..... ..$... @.... ...';

		let regex: RegExp = /[a-zA-Z0-9äöüÄÖÜß] [.]{3}$/g;

		expect(TextUtility.ellipsizeText(text).match(regex)).toHaveLength(1);
		expect(TextUtility.ellipsizeText(otherText).match(regex)).toHaveLength(1);
		expect(TextUtility.ellipsizeText(weirdText).match(regex)).toHaveLength(1);
	});

	test('ellipsizeText will not change text in correct format', () => {
		let text: string = 'This text is already correctly formatted ...';

		expect(TextUtility.ellipsizeText(text)).toStrictEqual(text);
	})
});
