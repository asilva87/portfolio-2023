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
	public encipheredText: string = ''
	public originalText = ''
	private resolvedKey = ''

	constructor() {
		this.textInputForm = new FormGroup({
			textInput: new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
			keyInput: new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
		})
	}

	ngOnInit() {
		this.alphabetMatrixInit()
	}

	private alphabetMatrixInit(): void {
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
	}

	private resolveKey(key: string): void {
		if (!key) return

		let resolvedKey = "";

		while (resolvedKey.length < this.originalText.length) {
			resolvedKey += key.charAt((resolvedKey.length) % key.length);
		}

		this.resolvedKey = resolvedKey.toUpperCase()
	}

	public onInput(event: Event, inputType: string): void {
		const input = event.target as HTMLInputElement
		let value = input.value

		if (inputType === 'originalText') {
			this.originalText = value
			if ((event as KeyboardEvent).key === 'Backspace') {
				if (this.originalText.length !== 0) {
					this.originalText = this.originalText.slice(0, this.originalText.length - 1)
				}
			} else {
				if (this.resolvedKey.length !== 0) {
					this.resolvedKey = this.resolvedKey.slice(0, this.resolvedKey.length - 1)
				}
			}
		}
		if (inputType === 'keyText') this.resolveKey(value)
	}

	public clearInput() {
		this.textInputForm.get('textInput')?.setValue('')
		this.textInputForm.get('keyInput')?.setValue('')
		this.originalText = ''
		this.resolvedKey = ''
	}

	public encipher() {
		// This removes the first row, which is just the names for the columns.
		const matrixNoColumnNames = this.alphabetMatrix.slice(1)
		let currentAlphabet: AlphabetObject[] | undefined = []
		this.originalText = this.originalText.toUpperCase()
		let cipherLetterObj: AlphabetObject | undefined
		let cipherLetterObjIndex: number = 0

		for (let i = 0; i < this.originalText.length; i++) {
			// Find row alphabet whose first letter is the same as the current letter
			// of the original text.
			for (let j = 0; j < matrixNoColumnNames.length; j++) {
				if (matrixNoColumnNames[j][i].letter === this.originalText[i]) {
					currentAlphabet = matrixNoColumnNames[j].slice(1)
				}

				for (let k = 1; k < this.alphabetMatrix[0].length - 1; k++) {
					if (this.alphabetMatrix[0][k].letter === this.resolvedKey[i]) {
						cipherLetterObjIndex = k

						this.alphabetMatrix[i + 1][k].marked = true
					}
				}
			}

			this.encipheredText += currentAlphabet[cipherLetterObjIndex - 1].letter
			console.log(this.encipheredText)
		}
	}
}
