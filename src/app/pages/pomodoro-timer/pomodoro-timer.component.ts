import { Component, KeyValueDiffer, KeyValueDiffers } from '@angular/core'

enum PeriodType {
	ACTIVITY = 'orange',
	REST = 'green',
	LONGREST = 'blue',
}

interface Period {
	length: number
	type: PeriodType
	active: boolean
}

@Component({
	selector: 'app-pomodoro-timer',
	templateUrl: './pomodoro-timer.component.html',
	styleUrls: ['./pomodoro-timer.component.scss'],
})
export class PomodoroTimerComponent {
	public periods: Period[] = [
		{ length: 25, type: PeriodType.ACTIVITY, active: false },
		{ length: 5, type: PeriodType.REST, active: false },
		{ length: 25, type: PeriodType.ACTIVITY, active: false },
		{ length: 5, type: PeriodType.REST, active: false },
		{ length: 25, type: PeriodType.ACTIVITY, active: false },
		{ length: 5, type: PeriodType.REST, active: false },
		{ length: 25, type: PeriodType.ACTIVITY, active: false },
		{ length: 30, type: PeriodType.LONGREST, active: false },
	]
	public isRest = false
	public currentPeriod = 0
	private timeInterval: any
	public minutes = '00'
	public seconds = '00'
	public minutesDisplay = ['0', '0']
	public secondsDisplay = ['0', '0']
	public timerRunning = false
	public timerPaused = false

	differ: KeyValueDiffer<string, any>
	constructor(private differs: KeyValueDiffers) {
		this.differ = this.differs.find({}).create()
	}

	ngDoCheck(): void {
		const change = this.differ.diff(this)

		if (change) {
			change.forEachChangedItem(item => {
				if (
					(item.key === 'timerRunning' && !item.previousValue) ||
					(item.key === 'currentPeriod' && item.currentValue !== 0)
				) {
					this.periods[this.currentPeriod].active = true
				}

				if (
					item.key === 'minutes' &&
					item.currentValue == this.periods[this.currentPeriod].length
				) {
					if (this.currentPeriod !== this.periods.length) {
						this.currentPeriod++
					}

					if (this.currentPeriod === this.periods.length) {
						this.currentPeriod = 0
					}

					this.resetTimer()
				}
			})
		}
	}

	public startTimer() {
		if (this.timerRunning) return

		this.timerRunning = true
		this.timerPaused = false

		this.timeInterval = setInterval(() => {
			let seconds = Number(this.seconds)
			seconds++
			let minutes = Number(this.minutes)

			if (seconds % 60 === 0) {
				minutes++
				seconds = 0
			}

			this.seconds = seconds < 10 ? `0${seconds}` : seconds.toString()
			this.minutes = minutes < 10 ? `0${minutes}` : minutes.toString()
			this.secondsDisplay = this.seconds.toString().split('')
			this.minutesDisplay = this.minutes.toString().split('')
		}, 1000)
	}

	public stopTimer(): void {
		clearInterval(this.timeInterval)
		this.timerRunning = false
		this.timerPaused = false
		this.currentPeriod = 0
		this.resetTimer()
	}

	private resetTimer(): void {
		this.resetProgressIndicator()
		this.seconds = this.minutes = '00'
		this.secondsDisplay = this.minutesDisplay = ['0', '0']
	}

	private resetProgressIndicator() {
		this.periods = this.periods.map((period: Period) => {
			return { ...period, active: false }
		})
	}

	public pauseTimer(): void {
		clearInterval(this.timeInterval)
		this.timerRunning = false
		this.timerPaused = true
	}
}
