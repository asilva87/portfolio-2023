import { getLocaleCurrencySymbol } from '@angular/common'
import { Component, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core'
import getSymbolFromCurrency from 'currency-symbol-map'
import { CurrencyRatesService } from 'src/app/services/currency-rates.service'

@Component({
	selector: 'app-currency-converter',
	templateUrl: './currency-converter.component.html',
	styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent {
	public amountInput = 0
	public convertedAmount = 0
	// "USD" is selected as the default base currency
	public fromCurrency = 'USD'
	public toCurrency = 'USD'
	private fromCurrencyRateInUSD = 0
	private toCurrencyRateInUSD = 0
	public availableCurrencies = ['']
	private rates: Record<string, number> = {}
	private directionSwapped = false

	differ: KeyValueDiffer<string, any>
	constructor(
		private differs: KeyValueDiffers,
		private currencyRatesService: CurrencyRatesService
	) {
		this.differ = this.differs.find({}).create()

		this.currencyRatesService.getCurrencies().subscribe(result => {
			this.availableCurrencies = Object.keys(result.rates)
			this.rates = result.rates
		})
	}

	ngDoCheck() {
		const change = this.differ.diff(this)

		if (change) {
			change.forEachChangedItem(item => {
				if (item.key === 'directionSwapped') {
					const fromCurrency = this.fromCurrency
					this.fromCurrency = this.toCurrency
					this.toCurrency = fromCurrency
				}

				this.onInput(this.amountInput.toString())
			})
		}
	}

	public onInput(number: string): void {
		this.amountInput = Number(number)

		if (!Number(number)) {
			return
		}

		const amountInput = Number(number)

		this.fromCurrencyRateInUSD = this.rates[this.fromCurrency]
		this.toCurrencyRateInUSD = this.rates[this.toCurrency]

		const amountInUsd = amountInput / this.fromCurrencyRateInUSD

		this.convertedAmount = Number((amountInUsd * this.toCurrencyRateInUSD).toFixed(2))
	}

	public swapDirection() {
		this.directionSwapped = !this.directionSwapped
	}
}
