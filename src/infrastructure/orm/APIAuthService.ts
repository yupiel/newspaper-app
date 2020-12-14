export class APIAuthService {
    private _user: string = '';
    private _password: string = '';

    private _baseURL: string =
        'https://sandbox-api.ipool.asideas.de/sandbox/api';

    public authorized: boolean = false;

    public get credentials() : string {
        if(!this._user || !this._password)
            return ''
        else
            return btoa(atob(this._user) + ':' + atob(this._password));
    }

    constructor() {
        this.authorized = false;
    }

    public async credentialsValid(
        user: string,
        password: string
    ): Promise<boolean> {
        return await fetch(`${this._baseURL}/statistics`, {
            headers: { Authorization: `Basic ${btoa(`${user}:${password}`)}` },
        })
            .then((res) => {
                if (res.ok || res.status === 200) {
                    this._user = btoa(user);
                    this._password = btoa(password);
                    this.authorized = true;

                    return true;
                }
                this.authorized = false;
                return false;
            })
            .catch((err) => {
                console.error(err);
                this.authorized = false;
                return false;
            });
    }
}
