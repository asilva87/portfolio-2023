import { Component, KeyValueDiffer, KeyValueDiffers } from '@angular/core'

@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
	public secondaryDisplayValue = ['']
	public mainDisplayValue = ['0']
	private y = ''
	public x = ''
	private displayWillReset = true
	private currentOperation = ''
	public ipnOn = false
	private memory = 0
	public secondaryButtonsActive = false

	differ: KeyValueDiffer<string, any>
	constructor(private differs: KeyValueDiffers) {
		this.differ = this.differs.find({}).create()
	}

	ngDoCheck() {
		const change = this.differ.diff(this)

		if (change) {
			change.forEachChangedItem(item => {
				if (this.x !== '.' && this.x !== '-' && !this.x.match(/\d+ e \d+/)) {
					if (Number.isNaN(+this.x)) {
						this.x = 'Error'
					}
					if (Number.isNaN(+this.y)) {
						this.y = 'Error'
					}
				}

				if (item.key === 'x' || item.key === 'y') {
					if (this.y !== '') {
						this.secondaryDisplayValue = [...this.y.split('')]
					} else {
						this.secondaryDisplayValue = ['']
					}

					if (this.x !== '') {
						this.mainDisplayValue = [...this.x.split('')]
					} else {
						this.mainDisplayValue = ['0']
					}
				}
			})
		}
	}

	public onButtonClick(value: string): void {
		if (this.displayWillReset) {
			this.secondaryDisplayValue = [...this.x.split('')]
			this.y = this.x

			this.x = value

			this.displayWillReset = false
		} else {
			if (Number.isInteger(+value) || value === '.') {
				this.x += value
			} else {
				this.onOperation('-')
			}
		}
	}

	public clear() {
		if (this.x) {
			this.x = ''
			this.mainDisplayValue = ['0']
		} else {
			this.y = ''
		}

		this.displayWillReset = true
	}

	public onOperation(operation: string): void {
		if (!this.displayWillReset) {
			this.displayWillReset = true
			this.currentOperation = operation
			this.y = this.x
		}
	}

	public invertNumberSign(): void {
		if (Math.sign(Number(this.x)) === 1) {
			this.x = `-${this.x}`
		} else {
			this.x = this.x.slice(1)
		}
	}

	public divideBy100(): void {
		let percentageValue = Number(this.x) / 100

		if (percentageValue.toString().length > 13) {
			percentageValue = +percentageValue.toFixed(13)
		}

		this.x = percentageValue.toString()
	}

	public produceResult(operation?: string): void {
		const currentOperation = operation || this.currentOperation
		this.displayWillReset = true
		const curY = Number(this.y)
		const curX = Number(this.x)

		switch (currentOperation) {
			case '+':
				this.y = this.x = (curY + curX).toString()
				break
			case '-':
				this.y = this.x = (curY - curX).toString()
				break
			case '*':
				this.y = this.x = (curY * curX).toString()
				break
			case '/':
				this.y = this.x = (curY / curX).toString()
				break
			case 'yRoot':
				this.x = Math.pow(curY, 1 / curX).toString()
				break
			case 'expoY':
				this.x = Math.pow(curY, curX).toString()
				break
			case 'ln':
				this.y = this.x = Math.log(curX).toString()
				break
			case 'log10':
				this.y = this.x = Math.log10(curX).toString()
				break
			case 'log2':
				this.y = this.x = Math.log2(curX).toString()
				break
			case 'logY':
				this.x = (Math.log(curY) / Math.log(curX)).toString()
				break
			case 'cubicRoot':
				this.y = this.x = Math.cbrt(curX).toString()
				break
			case 'squareRoot':
				this.y = this.x = Math.sqrt(curX).toString()
				break
			case 'xSquared':
				this.y = this.x = Math.pow(curX, 2).toString()
				break
			case 'xCubed':
				this.y = this.x = Math.pow(curX, 3).toString()
				break
			case '10Xed':
				this.y = this.x = Math.pow(10, curX).toString()
				break
			case 'yXed':
				this.y = this.x = Math.pow(curX, curY).toString()
				break
			case 'eXed':
				this.y = this.x = Math.pow(Math.E, curX).toString()
				break
			case '2Xed':
				this.y = this.x = Math.pow(2, curX).toString()
				break
			case 'cos':
				this.y = this.x = Math.cos(curX).toString()
				break
			case 'cosh':
				this.y = this.x = Math.cosh(curX).toString()
				break
			case 'tan':
				this.y = this.x = Math.tan(curX).toString()
				break
			case 'tanh':
				this.y = this.x = Math.tanh(curX).toString()
				break
			case 'sin':
				this.y = this.x = Math.sin(curX).toString()
				break
			case 'sinh':
				this.y = this.x = Math.sinh(curX).toString()
				break
			case 'e':
				this.y = this.x = Math.E.toString()
				break
			case 'pi':
				this.x = Math.PI.toString()
				break
			case 'rand':
				this.x = Math.random().toString()
				break
			case 'EE':
				this.x = (curY * Math.pow(10, curX)).toString()
				break
		}
	}

	public onMemory(action: string): void {
		this.displayWillReset = true

		switch (action) {
			case 'MC':
				this.memory = 0
				break
			case 'M+':
				this.memory += Number(this.x)
				this.y = this.x = this.memory.toString()
				break
			case 'M-':
				this.memory -= Number(this.x)
				this.y = this.x = this.memory.toString()
				break
			case 'MR':
				this.y = this.x
				this.x = this.memory.toString()
				break
		}
	}

	public onParenthesis(type: string): void {
		if (type === 'open') {
		}
		if (type === 'close') {
		}
	}

	public toggle2ndButtons() {
		this.secondaryButtonsActive = !this.secondaryButtonsActive
	}
}
