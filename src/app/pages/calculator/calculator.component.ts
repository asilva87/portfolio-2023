import { Component, KeyValueDiffer, KeyValueDiffers } from '@angular/core'

@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.component.html',
	styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
	// Functionality related
	public secondaryDisplayValue = ['']
	public mainDisplayValue = ['0']
	private y = ''
	public x = ''
	private displayWillReset = true
	private currentOperation = ''
	public ipnOn = false

	differ: KeyValueDiffer<string, any>
	constructor(private differs: KeyValueDiffers) {
		this.differ = this.differs.find({}).create()
	}

	ngDoCheck() {
		const change = this.differ.diff(this)

		if (change) {
			change.forEachChangedItem(item => {
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

	public onOperation(operation: string) {
		if (!this.displayWillReset) {
			this.displayWillReset = true
			this.y = this.x
			this.currentOperation = operation
		}
	}

	public invertNumberSign() {
		if (Math.sign(Number(this.x)) === 1) {
			this.x = `-${this.x}`
		} else {
			this.x = this.x.slice(1)
		}
	}

	public divideBy100() {
		let percentageValue = Number(this.x) / 100

		if (percentageValue.toString().length > 13) {
			percentageValue = +percentageValue.toFixed(13)
		}
		console.log(percentageValue)
		this.x = percentageValue.toString()
	}

	public produceResult() {
		this.displayWillReset = true
		const curY = Number(this.y)
		const curX = Number(this.x)

		switch (this.currentOperation) {
			case '+':
				this.y, (this.x = (curY + curX).toString())
				break
			case '-':
				this.y, (this.x = (curY - curX).toString())
				break
			case '*':
				this.y, (this.x = (curY * curX).toString())
				break
			case '/':
				this.y, (this.x = (curY / curX).toString())
				break
		}

		this.y = ''
	}
}
