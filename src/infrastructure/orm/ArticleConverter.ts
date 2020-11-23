import { Article } from "../../domain/Article";


export class ArticleConverter {
    constructor() { }

    public convertJSONToArticle(articleJSON: InternalArticleJSON) {
        return new Article(
            articleJSON.id,
            articleJSON.language,
            new Date(Date.parse(articleJSON.dateIssued)),
            articleJSON.url,
            articleJSON.content,
            articleJSON.title,
            articleJSON.pictureReferences[0].originalImage.url
        );
    }
}

interface InternalArticleJSON {
    id: string;
    language: string;
    dateIssued: string;
    url: string;
    content: string;
    title: string;
    pictureReferences: PictureReference[];
}

interface PictureReference {
    originalImage: OriginalImage;
}

interface OriginalImage {
    url: string;
    width: number;
    height: number;
}
