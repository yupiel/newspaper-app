export class Article{
    private _id: string;
    private _language: string;
    private _dateIssued: Date;
    private _url: string;
    private _content: string;
    private _title: string;
    private _pictureURL: string;

    constructor(id:string, language: string, dateIssued: Date, url :string, content:string, title:string, pictureURL: string){
        this._id = id;
        this._language = language;
        this._dateIssued = dateIssued;
        this._url = url;
        this._content = content;
        this._title = title;
        this._pictureURL = pictureURL;
    }

    public get id(){
        return this._id;
    }

    public get language(){
        return this._language;
    }

    public get dateIssued(){
        return this._dateIssued;
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
        return this._pictureURL;
    }
}
