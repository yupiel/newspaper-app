export class TextUtility {
	public static trimContentToLength(
		content: string,
		maxCharacters: number = 100
	): string {
		if (!content || !maxCharacters) return '';

		try {
			console.log(content);
			console.log(`Content length: ${content.length}`);

			let teaser: string = '';
			let teaserSet: boolean = false;

			if (content.length > maxCharacters - 3) {
				let contentWords: Array<string> = content.split(' ');

				while (true) {
					let currentWord: string = contentWords.shift()!;

					if (
						teaser.length + currentWord.length <
						maxCharacters - 3
					) {
						teaser += currentWord + ' ';
					} else {
						if (teaser.length != 0) teaserSet = true;
						break;
					}
				}
			} else {
				teaser = content;
			}

			if (teaserSet) teaser = this.ellipsizeText(teaser);

			return teaser;
		} catch (e) {
			console.error(e);

			return content;
		}
	}

	public static ellipsizeText(text: string): string {
		if(!text) return '';

		text = text.trim();

		let regex: RegExp = /[a-zA-Z0-9äöüÄÖÜß] [.]{3}$/g;	//should be enough for german?

		if(!text.match(regex)){
			let matches: Array<string> | null = text.match(/[ $&+,:;=?@#|'<>.^*()%!-]*$/g);
			matches = matches!.filter(Boolean);
			if(matches && matches.length > 0){
				text = text.substr(0, text.length - matches![matches!.length - 1].length);
			}
			
			text += ' ...';
		}
		
		return text;
	}
}
