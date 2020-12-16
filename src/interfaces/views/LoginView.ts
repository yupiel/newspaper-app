import $ from 'jquery';
import { APIAuthService } from "../../infrastructure/api/APIAuthService";

export class LoginView{
    private _login: JQuery<HTMLElement>;

    private _apiAuthService: APIAuthService;
    public get apiAuthService(): APIAuthService{
        if(this._apiAuthService.authorized)
            return this._apiAuthService;

        throw Error('Tried to get API Auth service before it was passed to LoginView');
    }
    
    constructor(apiAuthService: APIAuthService){
        this._login = $('.login');

        this._apiAuthService = apiAuthService;

        $(document).on('click', '.login__submitbutton', async () => this.loginEventHandler());
    }

    private async loginEventHandler(){
        let result = await this._apiAuthService.credentialsValid($('.login__usernameinput').val() as string, $('.login__passwordinput').val() as string);

        if(result){
            this.loginSuccessSelfDestruction();
            $(document).trigger('loginSuccessEvent');
        }
        else{
            console.error('Login was not successful. Incorrect credentials.');
            $('.login__notice').html('Credentials incorrect. Try again.');

            $('.login__usernameinput').val('');
            $('.login__passwordinput').val('');
        }
    }

    private loginSuccessSelfDestruction(): void{
        $(this._login).remove();
    }
}