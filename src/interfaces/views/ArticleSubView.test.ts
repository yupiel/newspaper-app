import {ArticleSubView} from "./ArticleSubView";

describe('ArticleSubView', () => {

    test('trimContentToLength returns empty string on null|undefined|empty', () => {
        // @ts-ignore
        expect(ArticleSubView.trimContentToLength(null)).toEqual('')
        // @ts-ignore
        expect(ArticleSubView.trimContentToLength(undefined)).toEqual('')
        // @ts-ignore
        expect(ArticleSubView.trimContentToLength('')).toEqual('')
    })

    test('trimContentToLength returns empty string when limit is 0', () => {
        let limit = 0
        let content = 'Content'

        expect(content.length).toBeGreaterThan(limit)
        // @ts-ignore
        expect(ArticleSubView.trimContentToLength(content, limit)).toEqual('')
    })

    test('trimContentToLength returns empty on contiguous content', () => {
        let limit = 6
        let content = 'contentisking'

        expect(content.length).toBeGreaterThan(limit)
        // @ts-ignore
        expect(ArticleSubView.trimContentToLength(content, limit)).toEqual('')
    })

    test('trimContentToLength returns original content when beneath limit', () => {
        let limit = 100
        let content = 'Content under 100 characters.'

        expect(content.length).toBeLessThanOrEqual(limit)
        // @ts-ignore
        expect(ArticleSubView.trimContentToLength(content, limit)).toEqual(content)
    })

    test('trimContentToLength returns trimmed content with whole words and 3 trailing dots when above limit', () => {
        let limit = 20
        let content = 'Sooo much content here.'

        expect(content.length).toBeGreaterThan(limit)
        // @ts-ignore
        expect(ArticleSubView.trimContentToLength(content, limit)).toEqual('Sooo much ...')
    })

    test('trimContentToLength returns trimmed content with no more than 3 trailing dots when above limit', () => {
        // TODO How to test this?
    })

})