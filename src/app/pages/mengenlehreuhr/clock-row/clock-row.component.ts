import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-row',
  templateUrl: './clock-row.component.html',
  styleUrls: ['./clock-row.component.scss']
})
export class ClockRowComponent implements OnInit {
  // The fixed amount of cells per row. Since the "activeCells" array only receive
  // the amount of cells that are active, it means the remaining cells are inexistent
  // in the array and thus trying to access them results in "undefined", which won't
  // apply the class of "active" or "active-dark".
  @Input() repetitions!: number
  // The cells that are active (illuminated) in the row.
  @Input() activeCells: boolean[] = []
  // Whether the cells in the row are large or small, as they are in the original clock.
  @Input() largeCell!: boolean
  // Special colour rules are applied to the row of five-minutes cells.
  @Input() isFiveMinutes!: boolean
  // Some rows are of a darker orange than the others.
  @Input() isDark!: boolean
  // The array for the *ngIf in the template.
  public rangeValues: number[] = []

  constructor() { }

  // Populate the iterable.
  ngOnInit(): void {
    for (let i = 0; i < this.repetitions; i++) {
      this.rangeValues.push(i)
    }
  }

  // Get exhibition rules for both classes.
  public getColorRule(type: 'active' | 'active-dark', index: number): boolean {
    const indexPlus = index + 1

    if (type === 'active') {
      if (!this.isFiveMinutes) {
        if (!this.isDark) return this.activeCells[index]
      } else {
        if (indexPlus !== 0 && indexPlus % 3 !== 0) return this.activeCells[index]
      }
    }
    if (type === 'active-dark') {
      if (!this.isFiveMinutes) {
        if (this.isDark) return this.activeCells[index]
      } else {
        if (indexPlus !== 0 && indexPlus % 3 === 0) return this.activeCells[index]
      }
    }
    
    return false
  }
}
