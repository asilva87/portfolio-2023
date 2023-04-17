import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class CurrencyRatesService {
	private generalEndpoint = 'https://openexchangerates.org/api/latest.json'
	private key = '?app_id=adc06d5c9afc49579a203d345574e2a5'

	constructor(private http: HttpClient) {}

	public getCurrencies(): Observable<any> {
		return this.http.get(`${this.generalEndpoint}${this.key}`)
	}
}
