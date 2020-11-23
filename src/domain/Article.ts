export class Article{
    private _id: string;
    private _language: string;
    private _dateIssued: string;
    private _url: string;
    private _content: string;
    private _title: string;
    private _pictureReferences: PictureReference[];

    constructor(articleJSON: InternalArticleJSON){
        this._id = articleJSON.id;
        this._language = articleJSON.language;
        this._dateIssued = articleJSON.dateIssued;
        this._url = articleJSON.url;
        this._content = articleJSON.content;
        this._title = articleJSON.title;
        this._pictureReferences = articleJSON.pictureReferences;
    }

    public get id(){
        return this._id;
    }

    public get language(){
        return this._language;
    }

    public get dateIssuedYear(){
        return this._dateIssued.split('T')[0].split('-')[0];
    }
    public get dateIssuedMonth(){
        return this._dateIssued.split('T')[0].split('-')[1];
    }
    public get dateIssuedDay(){
        return this._dateIssued.split('T')[0].split('-')[2];
    }
    public get dateIssuedHour(){
        return this._dateIssued.split('T')[1].split(':')[0];
    }
    public get dateIssuedMinute(){
        return this._dateIssued.split('T')[1].split(':')[1];
    }

    public get url(){
        return this._url;
    }

    public get content(){
        return this._content;
    }

    public get title(){
        return this._title;
    }

    public get mainPictureUrl(){
        return this._pictureReferences[0].originalImage.url;
    }
}

export interface InternalArticleJSON {
    id: string;
    language: string;
    dateIssued: string;
    url: string;
    content: string;
    title: string;
    pictureReferences: PictureReference[];
}

export interface PictureReference {
    originalImage: OriginalImage;
}

export interface OriginalImage {
    url: string;
    width: number;
    height: number;
}
