import $ from 'jquery';
import { ListView } from './ListView';

export class SearchBarView {
    private _searchBar: JQuery<HTMLElement>;

    private _listView: ListView;

	constructor() {
        this._searchBar = $('.searchbar');
        
        $(document).on('click', '.searchbar__searchbutton', () => this.searchButtonHandler());
	}

	public initializeSearchBarView(listView: ListView): void {
        $(this._searchBar).html(`
            <input type="text" placeholder="Search" class="searchbar__searchinput">
            <span class="searchbar__searchbutton"></span>
        `);

        $(document).on('keyup', '.searchbar', (event) => this.searchOnKeyUp(event, 'Enter'));

        this._listView = listView;
    }
    
    private searchButtonHandler(): void {
        let searchContent: string = $('.searchbar__searchinput').val() as string;

        if(searchContent){
            this._listView.resetListView();
            this._listView.updateArticlesBasedOnPage(searchContent);
        }
    }

    private searchOnKeyUp(event: JQuery.KeyUpEvent, key: string){
        if(event && key){
            if(event.code == key){
                this.searchButtonHandler();
            }
        }
    }
}
