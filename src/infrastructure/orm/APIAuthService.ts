export class APIAuthService {
    private _user: string;
    private _password: string;

    private _baseURL: string = 'https://sandbox-api.ipool.asideas.de/sandbox/api/';

    constructor() { }

    public async credentialsValid(user: string, password: string): Promise<boolean> {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(user + ":" + password));

        return await fetch(`${this._baseURL}statistics`, {
            method: 'GET',
            headers: headers
        })
            .then(res => {
                if (res.status == 200){
                    this._user = btoa(user);
                    this._password = btoa(password);
                    return true;
                }
                return false;
            })
            .catch(err => {
                console.error(err);
                return false;
            });
    }
}