import { Component } from '@angular/core'
import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgForm,
	Validators,
} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const isSubmitted = form && form.submitted
		return !!(
			control &&
			control.invalid &&
			(control.dirty || control.touched || isSubmitted)
		)
	}
}

@Component({
	selector: 'app-sieve-of-eratosthenes',
	templateUrl: './sieve-of-eratosthenes.component.html',
	styleUrls: ['./sieve-of-eratosthenes.component.scss'],
})
export class SieveOfEratosthenesComponent {
	public numberInputForm: FormGroup
	public primes: number[] = []
	public matcher = new MyErrorStateMatcher()

	constructor() {
		this.numberInputForm = new FormGroup({
			numberInput: new FormControl(
				'0',
				Validators.compose([
					Validators.maxLength(4),
					Validators.pattern('^[0-9]*$'),
				])
			),
		})
	}

	public onKeyDown(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement
		const value = input.value

		console.log(event)
		if (event.key === '0' && value === '0') {
			event.preventDefault()
		}
	}

	public findPrimeNumbers(event: Event) {
		const input = event.target as HTMLInputElement
		let value = input.value

		if (value.startsWith('0')) {
			input.value = value.slice(1)
			value = value.slice(1)
		}

		if (!value) {
			return
		}

		// Create array of length "numberInput" filled with "false".
		// Here, "true" means that this number has been divisable by
		// at least one number before it and, thus, is not prime.
		// In the end, unmarked numbers (not divisable by numbers before it),
		// are all the possible prime numbers from 2 to "numberInput".
		const possiblePrimes: Array<boolean | number> = [...Array(+value).keys()]

		// Flag numbers that aren't prime, that is, numbers that can't
		// be divided by any other numbers except for 1.
		// startNumber === 2 and array[2] are synonimous because the array
		// starts at 0,
		// "currentBaseNumber" starts at "2" because numbers divided by "1"
		// are irrelevant, since every number would be marked and no
		// primes would be found.
		let currentBaseNumber = 2
		while (currentBaseNumber + 1 < +value) {
			for (let i = currentBaseNumber + 1; i <= +value; i++) {
				if (i % currentBaseNumber === 0) {
					possiblePrimes[i] = true
				}
			}

			currentBaseNumber++
		}

		this.primes = possiblePrimes
			.filter((value: number | boolean) => typeof value === 'number')
			.slice(2) as number[]
	}

	public clearInput() {
		this.numberInputForm.get('numberInput')?.setValue('0')
		this.primes = []
	}
}
