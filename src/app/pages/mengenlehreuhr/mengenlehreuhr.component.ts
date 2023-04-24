import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-mengenlehreuhr',
	templateUrl: './mengenlehreuhr.component.html',
	styleUrls: ['./mengenlehreuhr.component.scss'],
})
export class MengenlehreuhrComponent implements OnInit {
	private currentDateTime = new Date()
	public secondsActive: boolean[] = []
	public fiveHoursActive: boolean[] = []
	public unitHoursActive: boolean[] = []
	public fiveMinutesActive: boolean[] = []
	public unitMinutesActive: boolean[] = []

	constructor() {}

	ngOnInit(): void {
		this._populateTimeArrays()

		setInterval(() => {
			this.currentDateTime = new Date()

			this._populateTimeArrays()
		}, 1000)
	}

	// The logic is: if a row has four cells, but only two are active,
	// then the respective array will have only two elements (true).
	// This implicitly means that the other cells are inactive.
	// Done this way to prevent a bunch of loops in order to populate
	// arrays including "true" for active and "false" for inactive cells.
	private _populateTimeArrays() {
		const hours = this.currentDateTime.getHours()
		const minutes = this.currentDateTime.getMinutes()
		const seconds = this.currentDateTime.getSeconds()

		// All full five hours blocks.
		this.fiveHoursActive = Array(Math.floor(hours / 5)).fill(true)
		// Remaining hours
		this.unitHoursActive = Array(hours % 5).fill(true)
		// All full five minutes blocks.
		this.fiveMinutesActive = Array(Math.floor(minutes / 5)).fill(true)
		// Remaining minutes.
		this.unitMinutesActive = Array(minutes % 5).fill(true)
		// Second cell only active when second is odd.
		this.secondsActive = [seconds % 2 !== 0]
	}
}
