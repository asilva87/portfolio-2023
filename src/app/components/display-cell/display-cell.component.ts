import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'

import displayMappings from './display-cell-mappings'

@Component({
	selector: 'app-display-cell',
	templateUrl: './display-cell.component.html',
	styleUrls: ['./display-cell.component.scss'],
})
export class DisplayCellComponent implements OnChanges {
	@Input() numberToDisplay!: string

	public aRow: boolean[] = [false, false, false, false, false]
	public bRow: boolean[] = [false, false, false, false, false]
	public cRow: boolean[] = [false, false, false, false, false]
	public dRow: boolean[] = [false, false, false, false, false]
	public eRow: boolean[] = [false, false, false, false, false]
	public fRow: boolean[] = [false, false, false, false, false]
	public gRow: boolean[] = [false, false, false, false, false]

	constructor() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.numberToDisplay && this.numberToDisplay !== '') {
			const displayMap = displayMappings[this.numberToDisplay]

			this.aRow = displayMap[0]
			this.bRow = displayMap[1]
			this.cRow = displayMap[2]
			this.dRow = displayMap[3]
			this.eRow = displayMap[4]
			this.fRow = displayMap[5]
			this.gRow = displayMap[6]
		}
	}
}
