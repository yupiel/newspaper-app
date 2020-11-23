export class APIAuthService {
    private _user: string;
    private _password: string;

    private _baseURL: string = 'https://sandbox-api.ipool.asideas.de/sandbox/api';

    public authorized: boolean;
    public get credentials(){
        return btoa(atob(this._user) + ":" + atob(this._password));
    }

    constructor() {
        this.authorized = false;
    }

    public async credentialsValid(user: string, password: string): Promise<boolean> {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(user + ":" + password));

        return await fetch(`${this._baseURL}/statistics`, {
            method: 'GET',
            headers: headers
        })
            .then(res => {
                if (res.status == 200){
                    this._user = btoa(user);
                    this._password = btoa(password);

                    this.authorized = true;

                    return true;
                }
                this.authorized = false;
                return false;
            })
            .catch(err => {
                console.error(err);
                this.authorized = false;
                return false;
            });
    }
}