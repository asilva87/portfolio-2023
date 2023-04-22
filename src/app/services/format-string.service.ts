import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class FormatStringService {
	constructor() {}

	public removeHyphens(text: string): Observable<any> {
		const stringArr = text.split('-')
		const firstWord =
			stringArr[0].charAt(0).toUpperCase() + stringArr[0].slice(1)
		const formattedWord = [firstWord, ...stringArr.slice(1)].join(' ')

		return of(formattedWord)
	}
}
