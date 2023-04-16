import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-sieve-of-eratosthenes',
	templateUrl: './sieve-of-eratosthenes.component.html',
	styleUrls: ['./sieve-of-eratosthenes.component.scss'],
})
export class SieveOfEratosthenesComponent {
	public chosenNumber: number
	public primes: number[] = []

	constructor() {
		this.chosenNumber = 0
	}

	public onKeyDown(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement
		const value = input.value

		if (event.key === '0' && value === '0') {
			event.preventDefault()
		}
	}

	public findPrimeNumbers(chosenNumberStr: string) {
		let chosenNumber = Number(chosenNumberStr)

		if (!chosenNumber) {
			return
		}

		// Create array of length "numberInput" filled with "false".
		// Here, "true" means that this number has been divisable by
		// at least one number before it and, thus, is not prime.
		// In the end, unmarked numbers (not divisable by numbers before it),
		// are all the possible prime numbers from 2 to "numberInput".
		const possiblePrimes: Array<boolean | number> = [...Array(chosenNumber).keys()]

		// Flag numbers that aren't prime, that is, numbers that can't
		// be divided by any other numbers except for 1.
		// startNumber === 2 and array[2] are synonimous because the array
		// starts at 0,
		// "currentBaseNumber" starts at "2" because numbers divided by "1"
		// are irrelevant, since every number would be marked and no
		// primes would be found.
		let currentBaseNumber = 2
		while (currentBaseNumber + 1 < chosenNumber) {
			for (let i = currentBaseNumber + 1; i <= chosenNumber; i++) {
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
}
