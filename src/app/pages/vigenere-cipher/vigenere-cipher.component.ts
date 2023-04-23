import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

interface AlphabetObject {
	letter: string
	marked: boolean
}

export class VigenereInputErrorStateMatcher implements ErrorStateMatcher {
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
	selector: 'app-vigenere-cipher',
	templateUrl: './vigenere-cipher.component.html',
	styleUrls: ['./vigenere-cipher.component.scss'],
})
export class VigenereCipherComponent implements OnInit {
	public textInputForm: FormGroup
	public alphabetMatrix: AlphabetObject[][] = []
	public matcher = new VigenereInputErrorStateMatcher()

	constructor() {
		this.textInputForm = new FormGroup({
			textInput: new FormControl(
				'0',
				Validators.compose([
					Validators.maxLength(4),
					Validators.pattern('^[A-Z]*$'),
				])
			),
		})
	}

	ngOnInit() {
		this.alphabetMatrixInit()
	}

	private alphabetMatrixInit() {
		let alphabet: AlphabetObject[] = []
		let alphabetIndex = 0
		let firstLetters: AlphabetObject[] = []
		let lastLetters: AlphabetObject[] = []

		// Loop of the 26 letters of the English alphabet 26 times,
		// to create the alphabet matrix required for the Vigenere cipher.
		while (alphabetIndex <= 26) {
			// Get letters by ASCII code.
			for (let i = 65; i <= 90; i++) {
				alphabet.push({
					letter: String.fromCharCode(i),
					marked: false
				})
			}

			// Inject columns titles in the format of ['', 'A', 'B', 'C'...]
			if (alphabetIndex === 26) {
				this.alphabetMatrix = [[{ letter: '', marked: false }, ...alphabet], ...this.alphabetMatrix]

				break
			}

			// Here the permutation begins.
			// "firstLetters" is an array containing the letters that are supposed to be
			// the first in the alphabet. That is, from the current index all the way
			// until the end.
			// "lastLetters" are the letters that are supposed to be attached to the end.
			firstLetters = alphabet.slice(alphabetIndex)
			lastLetters = alphabet.slice(0, alphabetIndex)
			alphabet = [...firstLetters, ...lastLetters]

			// Inject rows titles.
			// Every row should have a title, which is the first letter of the current
			// iteration of the alphabet.
			alphabet = [firstLetters[0], ...alphabet]

			this.alphabetMatrix.push(alphabet)

			alphabet = []

			alphabetIndex++
		}
		console.log(this.alphabetMatrix)
	}

	public encipher(event: Event) {

	}

	public clearInput() {
		this.textInputForm.get('numberInput')?.setValue('0')
	}
}
