import { Component } from '@angular/core'
import { ErrorStateMatcher } from '@angular/material/core'
import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgForm,
	Validators,
} from '@angular/forms'

import indoRoman from './util/indo-roman'
// import { MatSlideToggleChange } from '@angular/material/slide-toggle'

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		return !!(control && control.invalid)
	}
}

@Component({
	selector: 'app-roman-numerals-converter',
	templateUrl: './roman-numerals-converter.component.html',
	styleUrls: ['./roman-numerals-converter.component.scss'],
})
export class RomanNumeralsConverterComponent {
	public myForm: FormGroup
	public romanNumber = ''
	public matcher = new MyErrorStateMatcher()
	// public largeNumbersMode = 'vinculum'

	constructor() {
		this.myForm = new FormGroup({
			myNumberInput: new FormControl('0', [Validators.pattern('^[0-9]*$')]),
		})
	}

	public clearInput() {
		this.myForm.get('myNumberInput')?.setValue('0')
		this.romanNumber = ''
	}

	public onKeyDown(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement
		const value = input.value

		if (event.key === 'Backspace') {
			this.myForm.get('myNumberInput')?.setValue('0')
			console.log(value, event)
		}

		if (event.key === '0' && value === '0') {
			event.preventDefault()
		}
	}

	// public onToggleChange(value: string) {
	// 	this.largeNumbersMode = value
	// }

	public convertToRoman(event: Event) {
		const input = event.target as HTMLInputElement
		let value = input.value

		if (value.startsWith('0')) {
			input.value = value.slice(1)
			value = value.slice(1)
		}

		const reversed = value.split('').reverse().join('')
		let decimalMultiplier = 1
		const decimals = []
		let convertedNumber = ''

		for (let number of reversed) {
			decimals.unshift({
				decimalPlace: decimalMultiplier,
				number: Number(number) * decimalMultiplier,
			})

			decimalMultiplier *= 10
		}

		for (let i = 0; i < decimals.length; i++) {
			const decimalNumber = decimals[i]

			if (decimalNumber.number) {
				convertedNumber += this.getRomanNumber(decimalNumber)
			}
		}

		this.romanNumber = convertedNumber
	}

	private loopRomanNumeral(romanNumeral: string, repetitions: number) {
		let repeatedRomanNumeral = ''

		for (let i = 0; i < repetitions; i++) {
			repeatedRomanNumeral += romanNumeral
		}

		return repeatedRomanNumeral
	}

	private getRomanNumber(numberObj: Record<string, number>): string {
		if (indoRoman[numberObj.number]) return indoRoman[numberObj.number]

		const halfNextDecimalPlace = (numberObj.decimalPlace * 10) / 2
		const nextDecimalPlace = numberObj.decimalPlace * 10
		const decimalPlaces = [halfNextDecimalPlace, nextDecimalPlace]

		// 5 and 10, 50 and 100, 500 and 1000, etc.
		// Example of numbers than can be emitted here if base(10): 40, 90
		for (let decimalPlace of decimalPlaces) {
			if (
				numberObj.number >= decimalPlace - numberObj.decimalPlace &&
				numberObj.number < decimalPlace
			) {
				return `${indoRoman[numberObj.decimalPlace]}${indoRoman[decimalPlace]}`
			}
		}

		// Example of numbers that can be emitted here if base(10): 10,20,30,-,50,60,70,80
		for (let decimalPlace of decimalPlaces) {
			// 50, 100
			if (
				numberObj.number >= numberObj.decimalPlace &&
				numberObj.number < decimalPlace - numberObj.decimalPlace
			) {
				return `${decimalPlace === nextDecimalPlace
					? indoRoman[halfNextDecimalPlace]
					: ''
					}${this.loopRomanNumeral(
						indoRoman[numberObj.decimalPlace],
						numberObj.number < halfNextDecimalPlace
							? numberObj.number > 10
								? numberObj.number / numberObj.decimalPlace
								: numberObj.number
							: (numberObj.number - halfNextDecimalPlace) / numberObj.decimalPlace
					)}`
			}
		}

		return ''
	}
}
